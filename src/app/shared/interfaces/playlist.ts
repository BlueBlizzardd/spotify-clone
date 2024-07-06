import { Song } from "./song"

export type Playlist = {
    id: string,
    name: string,
    songs: Song[],
    user?: string,
    image?: string
}