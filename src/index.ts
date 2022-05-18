import * as express from 'express';
import './db/mongoose';
import { SongRouter } from './routers/song';
import { ArtistRouter } from './routers/artist';
import { PlaylistRouter } from './routers/playlist';


const app = express.default();
app.use(express.json());
app.use(SongRouter);
app.use(ArtistRouter);
app.use(PlaylistRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server has started at port ', port);
});
