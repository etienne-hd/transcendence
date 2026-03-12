import * as z from 'zod';

export const PostMessagesMarkReadSchema = z.object({
  user_id: z.number(),
});

export type PostMessagesMarkReadDto = z.infer<
  typeof PostMessagesMarkReadSchema
>;
