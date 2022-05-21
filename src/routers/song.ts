import * as express from 'express';
import { Song } from '../models/song';

export const SongRouter = express.Router();

// create song
SongRouter.post('/song', (req, res) => {
    const song = new Song(req.body);
    song.save().then((data) => {
        return res.status(201).send(data);
    }).catch((err) => { 
        return res.status(400).send(err);
    });
});

// get song by name
SongRouter.get('/song', (req, res) => {
    const filter = req.query.name?{name: req.query.name.toString()}:{};
    Song.find(filter).then((data) => {
        if (data.length !== 0) {
            return res.send(data);
        } else {
            return res.status(404).send();
        }
    }).catch((err) => {
        return res.status(500).send(err);
    });
});

// get song by id
SongRouter.get('/song/:id', (req, res) => {
    Song.findById(req.params.id).then((data: any) => {
        if (!data) {
            return res.status(404).send();
        } else {
            return res.send(data);
        }
    }).catch((err) => {
        return res.status(500).send(err);
    });
});

// delete song by name
SongRouter.delete('/song', (req, res) => {
    if (!req.query.name) {
        return res.status(400).send({
            error: 'A name must be provided',
        });
    } else {
        Song.findOneAndDelete({name: req.query.name.toString()}).then((data: any) => {
            if (!data) {
                return res.status(404).send();
            } else {
                return res.send(data);
            }
        }).catch((err: any) => {
            return res.status(400).send(err);
        });
    }
});

// delete song by id
SongRouter.delete('/song/:id', (req, res) => {
    Song.findByIdAndDelete(req.params.id).then((data: any) => {
        if (!data) {
            return res.status(404).send();
        } else {
            return res.send(data);
        }
    }).catch((err: any) => {
        return res.status(400).send(err);
    });
});

// update song by name
SongRouter.patch('/song', (req, res) => {
    if (!req.query.name) {
      return res.status(400).send({
        error: 'A name must be provided'
      });
    } else {
      const allowedUpdates = ['name', 'author', 'duration', 'genres', 'single', 'numberReproductions'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  
      if (!isValidUpdate) {
        return res.status(400).send({
          error: 'Update is not permitted',
        });
      } else {
        Song.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
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

// update song by id
SongRouter.put('/song/:id', (req, res) => {
    const allowedUpdates = ['name', 'author', 'duration', 'genres', 'single', 'numberReproductions'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
       return res.status(400).send({
           error: 'Update is not permitted',
       });
    } else {
        Song.findByIdAndUpdate(req.params.id, req.body, {
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
});