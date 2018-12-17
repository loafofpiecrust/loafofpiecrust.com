import React, { FormEvent } from "react"
import { Layout } from "components/layout"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { css } from "emotion"
import { SongPlayer } from "components/song-player"
import QueryString from "query-string"
import { navigate } from "gatsby"

export default (props: { location: Location }) => {
  const query = QueryString.parse(props.location.search)
  let title = query.title || ""
  let album = query.album || ""
  let artist = query.artist || ""

  const play = async (evt: FormEvent) => {
    evt.preventDefault()
    const query = QueryString.stringify({
      title: title,
      album: album || undefined,
      artist: artist,
    })
    navigate(`${props.location.pathname}?${query}`, { replace: true })
  }

  return (
    <Layout title="Music Player">
      <SongPlayer
        autoPlay
        hideTitle
        title={title}
        artist={artist}
        album={album}
      />

      <form onSubmit={play} className={styles.form}>
        <div className={styles.inputs}>
          <TextField
            id="title"
            label="Song Title"
            required
            defaultValue={title}
            margin="normal"
            onChange={evt => {
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
            onChange={evt => {
              artist = evt.target.value
            }}
          />
          <span>on</span>
          <TextField
            id="album"
            margin="normal"
            label="Album"
            defaultValue={album}
            onChange={evt => {
              album = evt.target.value
            }}
          />
        </div>

        <Button type="submit" size="large" variant="contained">
          Load Stream
        </Button>
      </form>
    </Layout>
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
    flexFlow: "row nowrap",
    alignItems: "baseline",
    "& > *": {
      flexGrow: 1,
    },
    "& > span": {
      textAlign: "center",
    },
  }),
}
