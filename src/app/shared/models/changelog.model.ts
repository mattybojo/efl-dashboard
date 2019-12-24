import { firestore } from 'firebase';

export class Changelog {
  id?: string;
  date: firestore.Timestamp;
  msg: string;
  type: string;
}
