import * as z from 'zod';

export const DeleteFriendSchema = z.object({
  username: z.string().min(3).max(30),
});

export type DeleteFriendDto = z.infer<typeof DeleteFriendSchema>;
