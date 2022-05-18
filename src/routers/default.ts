import * as express from 'express';

export const DefaultRouter = express.Router();

DefaultRouter.all('*', (_, res) => {
  res.status(501).send();
});