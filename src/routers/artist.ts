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
    if (req.query.name) {
        const namereq = req.query.name;
        Artist
            .findOne({})
            .where('name').equals(namereq)
            .then((data: any) => {
                res.json(data);
            }).catch((error) => {
                res.json({message: error});
            });
    } else if (req.params) {
        const { id } = req.params;
        Artist.findById(id).then((data: any) => {
            res.json(data);
        }).catch((error) => {
            res.json({ message: error });
        });
    } else {
        res.json({message: 'Request Not Found'});
    }
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