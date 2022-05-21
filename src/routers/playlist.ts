import * as express from 'express';
import { Playlist } from '../models/playlist';

export const PlaylistRouter = express.Router();

/**
 * POST Playlist
 */
PlaylistRouter.post('/playlist', (req, res) => {
    const playlist = new Playlist(req.body);
    playlist.save().then((data) => {
      return res.status(201).send(data);
  }).catch((err) => { 
      return res.status(400).send(err);
  });
});

/**
 * GET Playlist por id
 */
PlaylistRouter.get('/playlist/:id', (req, res) => {
    // const id = req.query.id
    const { id } = req.params;
    Playlist.findById(id).then((data: any) => {
      if (!data) {
          return res.status(404).send();
      } else {
          return res.send(data);
      }
    }).catch((err) => {
        return res.status(500).send(err);
    });
});

/**
 * GET Playlist por nombre
 */
PlaylistRouter.get('/playlist', (req, res) => {
    const filter = req.query.name?{name: req.query.name.toString()}:{};
    Playlist.find(filter).then((data) => {
        if (data.length !== 0) {
            return res.send(data);
        } else {
            return res.status(404).send();
        }
    }).catch((err) => {
        return res.status(500).send(err);
    });
});

/**
 * DELETE Playlist por id
 */
PlaylistRouter.delete('/playlist/:id', (req, res) => {
    const { id } = req.params;
    Playlist.deleteOne({ _id: id }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

/**
 * PUT Playlist por id
 */
PlaylistRouter.put('/playlist/:id', (req, res) => {
    const { id } = req.params;
    const { name, songs, duration, genres } = req.body;
    Playlist.updateOne({ _id: id }, { $set: {name, songs, duration, genres} }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

/**
 * PATCH Playlist por nombre
 */
PlaylistRouter.patch('/playlist', (req, res) => {
    if (!req.query.name) {
        return res.status(400).send({
            error: 'A name must be provided'
        });
    } else {
        const allowedUpdates = ['name', 'songs', 'duration', 'genres'];
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
  
        if (!isValidUpdate) {
            return res.status(400).send({
                error: 'Update is not permitted',
            });
        } else {
            Playlist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
                new: true,
                runValidators: true,
            }).then((data) => {
            if (!data) {
                return res.status(404).send();
            } else {
                return res.send(data);
            }
        }).catch((err) => {
            return res.status(400).send(err);
        });
      }
    }
});
