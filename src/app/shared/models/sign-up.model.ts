import { firestore } from 'firebase';

export class SignUpRecord {
  id?: string;
  date: string; // ISO string
  gameDate: string; // ISO string
  user: string;
  isPlaying: boolean;
}
