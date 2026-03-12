import type { UserFront } from "./user";

export interface Friend {
  id: number;
  user: UserFront;
  status: string;
  created_at: string;
  friend_at: string;
}
