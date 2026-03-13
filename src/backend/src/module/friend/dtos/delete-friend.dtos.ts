import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from 'src/common/constants/constants';
import * as z from 'zod';

export const DeleteFriendSchema = z.object({
  username: z
    .string()
    .min(USER_USERNAME_MIN_LENGTH)
    .max(USER_USERNAME_MAX_LENGTH),
});

export type DeleteFriendDto = z.infer<typeof DeleteFriendSchema>;
