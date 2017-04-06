'use strict';

import Component, { tracked } from "@glimmer/component";
import 'whatwg-fetch'

export default class MusicLibrary extends Component {
  @tracked state = {
    songs: [],
    current: 0
  }

  constructor(options) {
    super(options);
    this.fetchSongs();
  }

  async fetchSongs() {
    const request = await fetch('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?limit=10');

    const json = await request.json();

    const songs = json.items.map(item => {
      return item.name;
    });

    this.state = {
      ...this.state,
      songs
    };

  }

  @tracked('state')
  get currentPlayingSong(): String {
    return this.state.songs[this.state.current];
  }

  @tracked('state')
  get hasMoreSongs(): Boolean {
    return (this.state.songs.length - 1) > this.state.current;
  }

  next() {
    const { current: prevCurrent } = this.state;

    this.state = {
      ...this.state,
      current: prevCurrent + 1
    };
  }
}
