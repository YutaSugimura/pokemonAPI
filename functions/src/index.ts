import * as functions from 'firebase-functions';
import type from './api/typeCompatibility';
import express from 'express';
import corsLib from 'cors';

const app = express();
const cors = corsLib();
const router = express.Router();

router.use(async (req, res, next) => {
  return await cors(req, res, async () => {
    next();
  });
});

app.use('/v1', router);

router.get(
  '/typeCompatibility',
  [],
  async (req: functions.Request, res: functions.Response) => {
    const result = await type(req);
    res.status(result.code).send(result.data);
  },
);

exports.api = functions.region('asia-northeast1').https.onRequest(app);
