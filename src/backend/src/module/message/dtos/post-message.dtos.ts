import { ZOD_MESSAGE_CONTENT } from 'src/common/validators/zod-validation.rule';
import * as z from 'zod';

export const PostMessageSchema = z.object({
  content: ZOD_MESSAGE_CONTENT.optional(),
  user_id: z.any(),
});

export type PostMessageDto = z.infer<typeof PostMessageSchema>;
