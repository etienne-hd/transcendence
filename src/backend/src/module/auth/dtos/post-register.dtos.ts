import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_EMAIL_REGEX,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from 'src/common/constants/constants';
import * as z from 'zod';

export const PostRegisterSchema = z.object({
  username: z
    .string()
    .min(USER_USERNAME_MIN_LENGTH)
    .max(USER_USERNAME_MAX_LENGTH),
  password: z
    .string()
    .min(USER_PASSWORD_MIN_LENGTH)
    .max(USER_PASSWORD_MAX_LENGTH),
  email: z
    .string()
    .min(USER_EMAIL_MIN_LENGTH)
    .max(USER_EMAIL_MAX_LENGTH)
    .regex(USER_EMAIL_REGEX),
  name: z.string().min(USER_NAME_MIN_LENGTH).max(USER_NAME_MAX_LENGTH),
});

export type PostRegisterDto = z.infer<typeof PostRegisterSchema>;
