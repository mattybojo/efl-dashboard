export class UserData {
  id?: string;
  name: string;
  email: string;
  photoUrl: string;
  emailVerified: boolean;
  uid: string;
  phoneNumber: string;
  isAdmin: boolean;
  displayName?: string; // the user's name in the DB (name as it appears in TeamPicker)
}
