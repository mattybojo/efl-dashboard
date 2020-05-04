import { firestore } from 'firebase';

export class ChatMessage {
  id?: string;
  text: string;
  user: ChatPlayer;
  date?: Date;
  timestamp?: firestore.Timestamp;
}

export class ChatPlayer {
  name: string;
  team: string;
  avatar?: string;
}
