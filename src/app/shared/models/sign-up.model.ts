import { firestore } from 'firebase';

export class SignUpRecord {
  id?: string;
  date: firestore.Timestamp;
  gameDate: firestore.Timestamp;
  user: string;
}
