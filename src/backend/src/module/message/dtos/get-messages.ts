import * as z from 'zod';

export const GetMessagesSchema = z.object({
  user_id: z.number(),
});

export type GetMessagesDto = z.infer<typeof GetMessagesSchema>;
