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
    Artist.findOne(filter).then((data) => {
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

// delete artist by name
ArtistRouter.delete('/artist', (req, res) => {
    const filter = req.query.name?{name: req.query.name.toString()}:{};
    Artist.deleteOne(filter).then((data) => {
        if (data.length !== 0) {
            res.send(data);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
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

// update artist by name
ArtistRouter.patch('/artist', (req, res) => {
    if (!req.query.name) {
      res.status(400).send({
        error: 'A name must be provided'
      });
    } else {
      const allowedUpdates = ['genres', 'monthlyListeners', 'songs'];
      const actualUpdates = Object.keys(req.query.name);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  
      if (!isValidUpdate) {
        res.status(400).send({
          error: 'Update is not permitted',
        });
      } else {
        Artist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
          new: true,
          runValidators: true,
        }).then((artist) => {
          if (!artist) {
            res.status(404).send();
          } else {
            res.send(artist);
          }
        }).catch((error) => {
          res.status(400).send(error);
        });
      }
    }
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