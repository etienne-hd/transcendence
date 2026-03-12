import * as z from 'zod';

export const DeleteMessageSchema = z.object({
  message_id: z.number(),
});

export type DeleteMessageDto = z.infer<typeof DeleteMessageSchema>;
