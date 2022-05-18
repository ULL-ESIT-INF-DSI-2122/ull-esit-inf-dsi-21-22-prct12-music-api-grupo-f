import * as express from 'express';
import { Song } from '../models/song';

export const SongRouter = express.Router();

// create song
SongRouter.post('/song', (req, res) => {
    const song = new Song(req.body);
    song.save().then((data) => {
        res.json(data);
    }).catch((error) => { 
        res.json({ message: error });
    });
});

// get song
SongRouter.get('/song/:id', (req, res) => {
    // const id = req.query.id
    const { id } = req.params;
    Song.findById(id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// delete song
SongRouter.delete('/song/:id', (req, res) => {
    const { id } = req.params;
    Song.deleteOne({ _id: id }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// update song
SongRouter.put('/song/:id', (req, res) => {
    const { id } = req.params;
    const { name, author, duration, genres, single, reporductions } = req.body;
    Song.updateOne({ _id: id }, { $set: {name, author, duration, genres, single, reporductions} }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});