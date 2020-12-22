import React, {FormEvent, useState} from "react"
import {globalHistory, navigate} from "@reach/router"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {css} from "@emotion/core"
import useQueryString from "use-query-string"
import {SongPlayer} from "components/song-player"

export default () => {
  const [query, setQuery] = useQueryString(globalHistory.location, navigate)
  let title = query.title || ""
  let album = query.album || ""
  let artist = query.artist || ""

  const [shouldAutoplay, setAutoplay] = useState(false)

  const play = async (evt: FormEvent) => {
    evt.preventDefault()
    setAutoplay(true)
    setQuery({
      title,
      artist,
      album: album || undefined,
    })
  }

  return (
    <>
      <SongPlayer
        autoPlay={shouldAutoplay}
        hideTitle
        title={title}
        artist={artist}
        album={album}
      />

      <form onSubmit={play} css={styles.form}>
        <div css={styles.inputs}>
          <TextField
            id="song"
            label="Song Title"
            required
            defaultValue={title}
            margin="normal"
            onChange={(evt) => {
              title = evt.target.value
            }}
          />
          <span>by</span>
          <TextField
            id="artist"
            label="Artist"
            required
            defaultValue={artist}
            margin="normal"
            onChange={(evt) => {
              artist = evt.target.value
            }}
          />
          <span>on</span>
          <TextField
            id="album"
            margin="normal"
            label="Album"
            defaultValue={album}
            onChange={(evt) => {
              album = evt.target.value
            }}
          />
        </div>

        <Button type="submit" size="large" variant="contained">
          Play
        </Button>
      </form>
    </>
  )
}

const styles = {
  form: css({
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-end",
  }),
  inputs: css({
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "baseline",
    "& > *": {
      flexGrow: 1,
      maxWidth: 220,
    },
    "& > span": {
      textAlign: "center",
    },
  }),
}
