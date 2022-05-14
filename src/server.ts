import express from 'express';
import { Playlist } from './models/playlist';

export class Server {
    readonly app = express();
    constructor(readonly port: number = Number(process.env.PORT)) {}

    public start() {
        this.app.use(express.json());
        this.app.get('/song', (req, res) => {
            const request = JSON.parse(req.body);
            console.log(request);

            //res.send(JSON.stringify({error: data.toString()}));
            //res.send(JSON.stringify({c: data.toString()}));
        });

        this.app.get('/playlist', (req, res) => {
            const id = req.query.id;
            Playlist.find
            console.log();
            res.json();

            //res.send(JSON.stringify({c: data.toString()}));
        });

        this.app.listen(this.port, () => console.log("Server listening on port:", this.port));
    }
}

let MyMusicApp: Server = new Server(3000);
MyMusicApp.start();