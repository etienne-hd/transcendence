import * as z from 'zod';

export const PostMessageSchema = z.object({
  content: z.string().max(3000).optional(),
  user_id: z.number(),
});

export type PostMessageDto = z.infer<typeof PostMessageSchema>;
