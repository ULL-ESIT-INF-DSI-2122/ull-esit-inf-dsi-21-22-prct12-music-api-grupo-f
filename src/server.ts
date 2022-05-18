import express from 'express';
import { Song } from './models/song';
import { Artist } from './models/artist';
import { Playlist } from './models/playlist';
export class Server {
    readonly app = express();
    constructor(readonly port: number = Number(process.env.PORT)) {}

    public start() {
        this.app.use(express.json()); 

        this.app.listen(this.port, () => console.log("Server listening on port:", this.port));
    }
}

let MyMusicApp: Server = new Server(3000);
MyMusicApp.start();