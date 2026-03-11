import * as z from 'zod';

export const PostFriendSchema = z.object({
  username: z.string().min(3).max(30),
});

export type PostFriendDto = z.infer<typeof PostFriendSchema>;
