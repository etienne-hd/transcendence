import type { UserFront } from "./user";

export interface Message {
  id: number;
  from_user: UserFront;
  to_user: UserFront;
  created_at: string;
  content: string;
  attachement: string;
}
