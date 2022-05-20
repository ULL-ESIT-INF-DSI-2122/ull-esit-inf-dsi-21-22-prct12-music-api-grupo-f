import * as express from 'express';

export const DefaultRouter = express.Router();

DefaultRouter.all('*', (_, res) => {
  return res.status(501).send();
});