export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  password: string;
  biography: string;
  avatar: string;
  created_at: string;
  last_seen_at: string;
}

export interface UserFront {
  id: number;
  username: string;
  name: string;
  biography: string;
  avatar: string;
  created_at: string;
  last_seen_at: string;
}
