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

// get artist by name
ArtistRouter.get('/artist', (req, res) => {
    const filter = req.query.name?{name: req.query.name.toString()}:{};
    Artist.find(filter).then((data) => {
        if (data.length !== 0) {
            res.send(data);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
});

// get artist by id
ArtistRouter.get('/artist/:id', (req, res) => {
    Artist.findById(req.params.id).then((data: any) => {
        if (!data) {
            res.status(404).send();
        } else {
            res.send(data);
        }
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