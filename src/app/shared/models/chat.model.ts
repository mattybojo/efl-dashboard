import { firestore } from 'firebase';

export class ChatMessage {
  id?: string;
  user: string;
  message: string;
  timestamp: firestore.Timestamp;
}
