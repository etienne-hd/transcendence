import { ZOD_USER_USERNAME } from 'src/common/validators/zod-validation.rule';
import * as z from 'zod';

export const DeleteFriendSchema = z.object({
  username: ZOD_USER_USERNAME,
});

export type DeleteFriendDto = z.infer<typeof DeleteFriendSchema>;
