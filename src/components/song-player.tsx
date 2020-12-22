import React from "react"
import ReactAudioPlayer from "react-audio-player"
import Axios from "axios"
import {useAsync} from "react-async-hook"
import h from "components/markup"

export const SongPlayer = (props: {
  title: string
  album?: string
  artist: string
  autoPlay?: boolean
  hideTitle?: boolean
}) => {
  if (!props.title || !props.artist) {
    return null
  }

  const {result: source, loading, error} = useAsync(parseStreams, [
    props.title,
    props.artist,
    props.album,
  ])

  if (loading) {
    return h.frag(`Loading '${props.title}'...`)
  }

  return h.div([Title(), Player()])

  function Player(): any {
    const stream = source.highQuality || source.lowQuality
    if (stream && !error) {
      return h(ReactAudioPlayer, {
        controls: true,
        autoPlay: props.autoPlay,
        src: stream.url,
        css: {width: "100%"},
      })
    } else {
      return "Not found"
    }
  }

  function Title(): any {
    const hideTitle = props.hideTitle || true
    if (!hideTitle) {
      const albumBit = props.album ? ` (${props.album})` : ""
      return h.h3({css: {marginBottom: 0}}, [
        props.title,
        " by ",
        props.artist,
        albumBit,
      ])
    }
    return null
  }
}

async function parseStreams(
  title: string,
  artist: string,
  album?: string
): Promise<any> {
  const res = await Axios.get(
    "https://d9fh049y3b.execute-api.us-east-2.amazonaws.com/prod/findSongOnYouTube",
    {
      params: {
        title: title.toLowerCase(),
        album: album ? album.toLowerCase() : "",
        artist: artist.toLowerCase(),
      },
    }
  )
  return res.data
}
