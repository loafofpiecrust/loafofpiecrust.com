---
title: My Immutable Self
date: 2019-12-18
series: Language Design
draft: true
---

## Notes
* Immutable data definitions
  * External mutability
    `let` vs `let mut` in rust.
    `let` vs `var` in Swift.
    Variability refers to whether a particular variable binding can have its reference changed.
    This is how `val` works in Kotlin, where what the binding refers to cannot change, but fields of the data itself can be freely changed.
    Rust by default propogates the mutability of the binding all the way down the tree of data, such that what the binding points to can't be changed, and no part of the data itself can change.
  * Internal mutability
    * `Cell` in Rust
    * data classes in Kotlin with `val` and `var`
* Dart [`built_value`](https://github.com/google/built_value.dart) is terrible because this should be built into the language, but especially not via transparent code generation.
  * Sidetrack: code-gen should be opaque a
