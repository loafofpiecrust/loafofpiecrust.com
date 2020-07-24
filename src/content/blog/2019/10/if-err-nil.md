---
title: If err != nil
date: 2020-01-02
series: Language Design
draft: false
---

## Introduction
Errors are really important.

My last workplace recently started using [golang](https://golang.org/), transitioning Java Spring Boot services over to the land of go.
This is fantastic.
Don't underestimate my enthusiasm for that decision, as Java is often verbose in a very bad way and I'm glad we're tossing it.
But I do still have gripes, one of which hinges on a particularly noticable part of the transition: the two languages' drastically different approaches to error handling.

## The case against golang

If I had a nickel for every time I saw the following lines of code, verbatim:

```go
if err != nil {
  return nil, err
}
```

I would be drowning in my vast riches.

If we look at error handling in Go in the context of multiple functions, we can see the simplicity shine through.
Let's say I simply want a function that finds my closest matching relative by name in a family tree.
I could simply return a `nil`able value, like `*Relative`, but this function could fail in various different ways.
There are a couple of options:

```go
// returns just a pointer to a Relative
func findInFamilyTree(name string) *Relative {
  // in the case of error:
  return nil
  // in case of success:
  return &result
}
// idiomatic go
// returns a pointer to a Relative and maybe an error
func findInFamilyTree(name string) (*Relative, error) {
  res, err := findInDatabase(name)
  if err != nil {
    return nil, err
  }
  return &res, nil
}
```

But this isn't quite what I want, semantically. First of all, if there's an error, I will never ever return a relative with it. And I will never return an error along with a valid `Relative`. But the returned pointer `*Relative` could be `nil` in any case. We have no compile-time guarantee about their mutual exclusivity. I'd like to do the following, but the language doesn't let me:

```go
// returns a non-nil Relative and maybe an error
func findInFamilyTree(name string) (Relative, error) {
  res, err := findInDatabase(name)
  if err != nil {
    // fails to compile because only pointer types can be nil
    return nil, err
  }
  return res, nil
}
```

So what the heck? There's no way for the language to represent the mutually exclusive existence of either a relative or an error. This means that *any* function that might return an error has to return its successful result as a pointer, always.

This is not to mention how tedious this kind of error handling can be. I often see several chains of this generic block one after the other, when there are multiple fallible operations in a row. And what if I want to log errors as JSON with extra helpful contextual messages, using something like [zerolog](https://github.com/rs/zerolog)?

```go
func doSomethingWithDatabase() (Response, error) {
  resp, err := http.Get(...)
  if err != nil {
    log.Error().Err(err).Msg("Failed to get data")
    return nil, err
  }
  conn, err := db.connect(...)
  if err != nil {
    log.Error().Err(err).Msg("Failed to connect")
    return nil, err
  }
  err = conn.write()
  if err != nil {
    log.Error().Err(err).Msg("Failed to write to db")
    return nil, err
  }
  return conn.get(), nil
}
```

Great, but I had to repeat the same thing over and over again, the *only* difference being what the exact text of the wrapping log message is. Besides, what if I want to keep the contextual messages, but use a different logging solution without adding an auxiliary layer of abstraction? I have to change each offending line, which isn't ideal. Of course I've chosen an example where all the logs are on the same level and errors are handled uniformly, but this is far and away the most common thing I've seen in go.

Despite this rigidity of conceptual expression, something important to note here is the flexibility of the *syntax* choice. The third fallible call has only one return value: error or nil, no other result upon success. We don't have to add any kind of dummy type for it either (like [`void`](https://developer.apple.com/documentation/swift/void) or [`()`](https://doc.rust-lang.org/std/primitive.unit.html)), since there isn't a special syntax for the return types of fallible functions. We just return the error if it's there. This should be a relatively uncommon case with well-constructed functional APIs, where operations have *results* rather than *side effects*, but it's a valid pattern for something like an IO call that pushes data, the only possible responses being nothing (success case), or an error (failure case).


## Step back: the case for explicit error handling

Somebody long ago thought that handling all potential runtime errors explicitly was too annoying. So, they decided that we could build error handling directly into the language to make propogation more ergonomic, and implicit. One example of this way of thinking manifests in Java.

```java
class MyBigFatThing {
  // @returns how many slices of pie I ate
  int eatMorePie() throws EatingException {
    Pie pie = this.takePie();
    this.shoveIn(pie);
  }

  Pie takePie() throws EatingException {
    // find the pies on the plate somewhere...
    // Oh no! NO MOAR PIES!
    throw EatingException("NO. MORE. PIE.");
  }

  void shoveIn(Pie p) {
    // shove it right down the gullet!
  }
}
```

Here, when `takePie()` is called, it throws an exception that automatically exits `eatMorePie()`, propogating the exception upward until there's some block like this:

```java
try {
  // do fallible things
  myLove.eatMorePie()
} catch (e: EatingException) {
  // log and handle exceptions
}
```

This is all fine and dandy as long as you're using "checked" exceptions, which require the `throws` annotation on the containing method to be able to do `throw MyCheckedException`. Then, methods with `throws` require a surrounding try-catch block at call-sites. However, there are a multitude of *un*checked exception types in Java (`RuntimeException`) that don't require this at all. Most notably, `NullPointerException`. If I try to access any variable in Java, it could potentially be `null`, and if it is I pay the price of a `NullPointerException` being thrown implicitly. I just have to *know* to do a `try {} catch(...) {}`. There isn't any required encoding of this potential for error in the type system, leaving a gaping escape hatch that makes the whole system unsound.

Python follows a very similar exception model, but I'm not even going to get into soundness in Python. Without a type system interface, there are near zero guarantees we can make about how or whether programs will run. You just have to happen to *know* when it might make sense to do try-catch, check for `None`, or exit the program.


## Proper sum types
In all the examples so far, a function returns a result via a different mechanism than it returns an error. In go, we always return both values that could potentially be `nil`, but they sit in different positions of the return. To handle an error, we simply check if it has a value. In Java, a method either returns a value or throws an exception, which we can choose to handle using the try-catch block. The former can't represent the true mutual exclusivity of the two cases, but the latter complicates the language by introducing special syntax for handling exceptions, not to mention the fact that the potential for error isn't baked directly into my return type. Especially considering `RuntimeException`s, this means that *any* method could throw an exception, and I may or may not be able to tell at compile time.

Error handling is important if you want to write a reliable piece of software, so we probably want to handle all possible errors in our code. This is a much less daunting task if the code itself guarantees to you whether or not it could result in an error, especially if that's encoded simply in the type system. The designers of `go` agreed with me on this point and went with the described solution of a tuple ([well, almost](https://gobyexample.com/multiple-return-values)) of result and error.

There are several other approaches to error handling used by well-known languages. Haskell is the poster child of functional language design, so of course I'll bring it up here in contrast. It has this idea of a sum type, where a piece of data can be one of a discrete set of user-defined values.

```haskell
data Bool = False | True
```

We can extend this concept into more complex constructs. For example, we can use sum types to represent a container that either holds a successful result or an error. *Never* both, *never* neither.

```haskell
data Result t e = Ok t | Err e

doStuff :: Int -> Result Int String
doStuff x = if x > 5 then (Ok x) else (Err "x not big enough")

doStuff 3 -- Returns an error!
doStuff 10 -- Returns a result
```

The most important parts of this code are that:
1. The `Result` type is fully symmetric and mututally exclusive. Either holds a result or an error with the same format.
2. There's no special syntax for error types or instantiation. `Err` is just like any other data constructor.

Furthermore, we can handle errors using pattern matching, like any other data.

```haskell
case doStuff 3 of
  Ok 1 -> "I got a one!"
  Ok 2 -> "I got a two!"
  Ok x -> "I got something else!"
  Err e -> "Failed..."
```


## Hold on: Where do errors come from?
Well, obviously the stork secret service drops them off in the middle of the night while you sleep in your cozy little bed.

Most of the time, errors that our code deals with are a result of some kind of IO.
I'm making a network request, reading a file, or asking for user input.

## The Rust Approach
Rust solves many of the issues I've brought up with elegance and verbosity.
This language handles all potential errors with style similar to many other functional languages.
If you want a deeper primer for error handling in the language, check out [this blog post](https://blog.burntsushi.net/rust-error-handling/).
It's a few years old now, but most of the concepts are still relevant to present-day Rust and explains with plentiful examples.

```rust
// Returns either the number of pies successfully eaten or an error
fn eat_pie() -> Result<u32, EatingError> {
  if too_full {
    Err(EatingError::TooFull)
  } else {
    1
  }
}
```

Any type that implements the `std::error::Error` trait can be used as an error type in a `Result`.
This makes it easy for errors to include whatever data necessary without simplifying itself into a string, which is generally how golang deals with errors.
This does make them a bit more difficult to compose than go's `fmt.Errorf("Something happened: %v", err)`, but makes error types no different than any other structure in your program.
This has the added benefit of making error types very clearly defined and easier to *decompose* when they happen.

## Question Marks
Speaking of error composability, a language should also provide convenient error propagation techniques.
Many languages provide a convenient syntax for dealing with optional data.
We see this in Kotlin and Swift with the `Type?` syntax, as shown below:

```swift
func doSomething() -> Int? {
    if condition {
        99
    } else {
        nil
    }
}
```

This is a concise syntax for referring to optional types, less verbose than Rust's `Option<Type>` or Haskell's `Maybe Type`.
However, giving optional types a shortcut syntax will make those types seem like the right answer most of the time.
I would contend that, on the contrary, result types that could contain a result or an explicit error are much more likely to fit the scenario.
Usually, it is useful to have an indicator as to *why* a variable contains `None` or `nil` or `null` rather than a value.

Ideally, then, those kinds of result types would be easier to type out than the simpler optionals.
On a related note, Rust makes arguably better use of the `?` symbol for error chaining and propagation, as [described here](https://doc.rust-lang.org/edition-guide/rust-2018/error-handling-and-panics/the-question-mark-operator-for-easier-error-handling.html).
Optional types require full type signatures like `Option<T>` and `Result<T, E>`, which feels like a necessary verbosity given the composability benefits of this approach.
I'm pretty content with library authors defining [error types particular to that library](https://github.com/dtolnay/thiserror) for use in `Result<T, LibraryError>` types.
If there's only one error type to use, then they could define a type alias:

```rust
type Result<T> = std::result::Result<T, LibraryError>;
```

This makes the error types clear for upstream applications using several libraries all together.
However, when an application wants a fallible function that isn't particularly an interface for other code, we'd like to have a universal `Result` type.
The best implementation of this I've seen so far comes from the [`anyhow`](https://github.com/dtolnay/anyhow) crate, providing `anyhow::Result<T>` that can hold any error type at all.
There have been several libraries designed to tackle the issue that have had issues with interoperability between different library error types, but I think `anyhow` finally does the trick.
A type like this should be included with the standard library, given its immense utility for writing applications.
It makes error handling and propagation in application code a breeze, in the common case that I don't particularly care about my error types.

## The End
In conclusion, make error handling a first class citizen in your software architecture.
It's important.
Good talk.
