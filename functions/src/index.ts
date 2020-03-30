import * as functions from 'firebase-functions';
import type from './api/typeCompatibility';

export const typeCompatibility = functions
  .region('asia-northeast1')
  .https.onRequest(type);
