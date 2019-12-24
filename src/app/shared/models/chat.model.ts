import { firestore } from 'firebase';

export class ChatMessage {
  user: string;
  message: string;
  timestamp: firestore.Timestamp;
}
