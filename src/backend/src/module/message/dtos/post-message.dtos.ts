import { MESSAGE_CONTENT_MAX_LENGTH } from 'src/common/constants/constants';
import * as z from 'zod';

export const PostMessageSchema = z.object({
  content: z.string().max(MESSAGE_CONTENT_MAX_LENGTH).optional(),
  user_id: z.number(),
});

export type PostMessageDto = z.infer<typeof PostMessageSchema>;
