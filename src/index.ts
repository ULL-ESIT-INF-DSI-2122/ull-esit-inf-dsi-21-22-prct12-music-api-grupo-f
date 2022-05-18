import * as express from 'express';
import './db/mongoose';
import { SongRouter } from './routers/song';
import { ArtistRouter } from './routers/artist';
import { PlaylistRouter } from './routers/playlist';
import { DefaultRouter } from './routers/default';


const app = express.default();
app.use(express.json());
app.use(SongRouter);
app.use(ArtistRouter);
app.use(PlaylistRouter);
app.use(DefaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server has started at port ', port);
});
