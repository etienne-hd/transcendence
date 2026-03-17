export interface SocketCaller {
  id: number;
  created_at: string;
  last_seen_at: string;
  username: string;
  name: string;
  biography: string | undefined;
  avatar: string | undefined;
}
