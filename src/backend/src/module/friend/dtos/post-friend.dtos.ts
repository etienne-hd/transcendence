import { ZOD_USER_USERNAME } from '../../../common/validators/zod-validation.rule';
import * as z from 'zod';

export const PostFriendSchema = z.object({
  username: ZOD_USER_USERNAME,
});

export type PostFriendDto = z.infer<typeof PostFriendSchema>;
