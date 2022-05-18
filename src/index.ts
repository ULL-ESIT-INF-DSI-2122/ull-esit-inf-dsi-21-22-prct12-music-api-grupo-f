import express from 'express';
import { SongRouter } from './routers/song';
import { ArtistRouter } from './routers/artist';
import { PlaylistRouter } from './routers/playlist';
import './database';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use(SongRouter);
app.use(ArtistRouter);
app.use(PlaylistRouter);

app.listen(port, () => {
    console.log('Server has started at port ', port);
});
