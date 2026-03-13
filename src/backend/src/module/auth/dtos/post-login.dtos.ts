import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from 'src/common/constants/constants';
import * as z from 'zod';

export const PostLoginSchema = z.object({
  username: z
    .string()
    .min(USER_USERNAME_MIN_LENGTH)
    .max(USER_USERNAME_MAX_LENGTH),
  password: z
    .string()
    .min(USER_PASSWORD_MIN_LENGTH)
    .max(USER_PASSWORD_MAX_LENGTH),
});

export type PostLoginDto = z.infer<typeof PostLoginSchema>;
