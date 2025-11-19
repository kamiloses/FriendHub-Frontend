export interface User {
  id: string;
  username: string;
  password?: string;
  isOnline: boolean;
  firstName: string;
  lastName: string;
  chatId: string;
}
