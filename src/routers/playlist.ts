import * as express from 'express';
import { Playlist } from '../models/playlist';

export const PlaylistRouter = express.Router();

// create playlist
PlaylistRouter.post('/playlist', (req, res) => {
    const playlist = new Playlist(req.body);
    playlist.save().then((data) => {
        res.json(data);
    }).catch((error) => { 
        res.json({ message: error });
    });
});

// get playlist
PlaylistRouter.get('/playlist/:id', (req, res) => {
    // const id = req.query.id
    const { id } = req.params;
    Playlist.findById(id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// delete playlist
PlaylistRouter.delete('/playlist/:id', (req, res) => {
    const { id } = req.params;
    Playlist.deleteOne({ _id: id }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// update playlist
PlaylistRouter.put('/playlist/:id', (req, res) => {
    const { id } = req.params;
    const { name, songs, duration, genres } = req.body;
    Playlist.updateOne({ _id: id }, { $set: {name, songs, duration, genres} }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});