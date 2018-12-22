import React, { FormEvent } from "react"
import { Layout } from "components/layout/layout"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { css } from "@emotion/core"
import { SongPlayer } from "components/song-player"
import QueryString from "query-string"
import { navigate } from "gatsby"
import { Location } from "@reach/router"

let shouldAutoplay = false

export default () => <Location>{({ location }) => {
  const query = QueryString.parse(location.search)
  let title = query.title || ""
  let album = query.album || ""
  let artist = query.artist || ""

  const play = async (evt: FormEvent) => {
    evt.preventDefault()
    const newQuery = QueryString.stringify({
      title,
      artist,
      album: album || undefined,
    })
    shouldAutoplay = true
    navigate(`${location.pathname}?${newQuery}`, { replace: true })
  }

  return <>
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
}}</Location>

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
