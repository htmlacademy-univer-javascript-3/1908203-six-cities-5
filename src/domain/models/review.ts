import { User } from './user';

export type Review = {
  id: number;
  content: string;
  user: User;
  timestamp: Date;
  rating: number;
}
