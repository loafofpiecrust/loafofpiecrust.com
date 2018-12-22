import React, { Component } from "react"
import ReactAudioPlayer from "react-audio-player"
import Axios from "axios"
import { jsx as h } from "@emotion/core"

export class SongPlayer extends Component<{
  title: string
  album?: string
  artist: string
  autoPlay?: boolean
  hideTitle?: boolean
}> {
  state = {
    currentSong: null,
    source: null,
  }

  async fetchSource() {
    const source = await parseStreams(
      this.props.title,
      this.props.artist,
      this.props.album,
    )
    this.setState({
      source,
      currentSong: this.props,
    })
  }

  isLoaded() {
    return this.state.source && this.props === this.state.currentSong
  }

  render() {
    if (!this.props.title || !this.props.artist) {
      return null
    }

    let player
    if (this.isLoaded()) {
      const source = this.state.source
      const stream = source.highQuality || source.lowQuality
      if (stream) {
        player = (
          <ReactAudioPlayer
            controls
            autoPlay={this.props.autoPlay}
            src={stream.url}
            style={{ width: "100%" }}
          />
        )
      } else {
        player = "Not found"
      }
    } else {
      this.fetchSource()
      player = "Loading..."
    }

    let title = null
    const hideTitle = this.props.hideTitle || true
    if (!hideTitle) {
      let albumBit = ""
      if (this.props.album) {
        albumBit = ` (${this.props.album})`
      }
      title = (
        <h3 style={{ marginBottom: 8 }}>
          {this.props.title} by {this.props.artist}
          {albumBit}
        </h3>
      )
    }

    return (
      <div>
        {title}
        {player}
      </div>
    )
  }
}

async function parseStreams(
  title: string,
  artist: string,
  album?: string,
): Promise<any> {
  const res = await Axios.get(
    "https://us-central1-turntable-3961c.cloudfunctions.net/parseStreamsFromYouTube",
    {
      params: {
        title: title.toLowerCase(),
        album: album ? album.toLowerCase() : "",
        artist: artist.toLowerCase(),
      },
    },
  )
  return res.data
}
