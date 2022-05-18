import * as express from 'express';
import { Artist } from '../models/artist';


export const ArtistRouter = express.Router();

// create artist
ArtistRouter.post('/artist', (req, res) => {
    const artist = new Artist(req.body);
    artist.save().then((data) => {
        res.json(data);
    }).catch((error) => { 
        res.json({ message: error });
    });
});

// get artist
ArtistRouter.get('/artist/:id', (req, res) => {
    // const id = req.query.id
    const { id } = req.params;
    Artist.findById(id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// delete artist
ArtistRouter.delete('/artist/:id', (req, res) => {
    const { id } = req.params;
    Artist.deleteOne({ _id: id }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// update artist
ArtistRouter.put('/artist/:id', (req, res) => {
    const { id } = req.params;
    const { name, genres, songs, monthlyListeners } = req.body;
    Artist.updateOne({ _id: id }, { $set: {name, genres, songs, monthlyListeners } }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});