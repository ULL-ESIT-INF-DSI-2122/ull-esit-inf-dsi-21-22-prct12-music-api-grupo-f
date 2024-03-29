import * as express from 'express';
import { Artist } from '../models/artist';

export const ArtistRouter = express.Router();

/**
 * @description POST Artist
 */
ArtistRouter.post('/artist', (req, res) => {
    const artist = new Artist(req.body);
    artist.save().then((data) => {
        return res.status(201).send(data);
    }).catch((err) => { 
        return res.status(400).send(err);
    });
});

/**
 * GET Artist por nombre
 */
ArtistRouter.get('/artist', (req, res) => {
    const filter = req.query.name?{name: req.query.name.toString()}:{};
    Artist.find(filter).then((data) => {
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
 * GET Artist por id
 */
ArtistRouter.get('/artist/:id', (req, res) => {
    Artist.findById(req.params.id).then((data: any) => {
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
 * DELETE Artist por nombre
 */
ArtistRouter.delete('/artist', (req, res) => {
    if (!req.query.name) {
        return res.status(400).send({
            error: 'A name must be provided',
        });
    } else {
        Artist.findOneAndDelete({name: req.query.name.toString()}).then((data: any) => {
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

/**
 * DELETE Artist por id
 */
ArtistRouter.delete('/artist/:id', (req, res) => {
    Artist.findByIdAndDelete(req.params.id).then((data: any) => {
        if (!data) {
            return res.status(404).send();
        } else {
            return res.send(data);
        }
    }).catch((err: any) => {
        return res.status(400).send(err);
    });
});

/**
 * PATCH Artist por nombre
 */
ArtistRouter.patch('/artist', (req, res) => {
    if (!req.query.name) {
      return res.status(400).send({
        error: 'A name must be provided'
      });
    } else {
      const allowedUpdates = ['name', 'genres', 'monthlyListeners', 'songs'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  
      if (!isValidUpdate) {
        return res.status(400).send({
          error: 'Update is not permitted',
        });
      } else {
        Artist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
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

/**
 * PATCH Artist por id
 */
ArtistRouter.patch('/artist/:id', (req, res) => {
    const allowedUpdates = ['name', 'genres', 'monthlyListeners', 'songs'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
       return res.status(400).send({
           error: 'Update is not permitted',
       });
    } else {
        Artist.findByIdAndUpdate(req.params.id, req.body, {
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