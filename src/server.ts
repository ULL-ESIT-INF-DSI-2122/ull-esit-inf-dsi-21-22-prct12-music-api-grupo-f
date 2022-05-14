import express from 'express';
import mongoose from 'mongoose';
import { Playlist } from './models/playlist';
require("dotenv").config();

export class Server {
    readonly app = express();
    constructor(readonly port: number = 3000) {}

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

        this.app.get('*', (_, res) => {
            return res.send({
                err: '<h1>404<h1>',
            });
        });

        if (process.env.MONGODB_URI != undefined) {
            mongoose
                .connect(process.env.MONGODB_URI)
                .then(() => console.log('Connected to MongoDB Atlas'))
                .catch((err) => console.error(err));
        } else {
            console.log('Error: Needed initialize .env file');
        }

        this.app.listen(this.port, () => console.log("Server listening on port:", this.port));
    }

}

let MyMusicApp: Server = new Server(9000);
MyMusicApp.start();