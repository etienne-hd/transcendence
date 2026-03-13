import {
  USER_BIOGRAPHY_MAX_LENGTH,
  USER_BIOGRAPHY_MIN_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_EMAIL_REGEX,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from 'src/common/constants/constants';
import * as z from 'zod';

export const PutMeSchema = z.object({
  username: z
    .string()
    .min(USER_USERNAME_MIN_LENGTH)
    .max(USER_PASSWORD_MAX_LENGTH)
    .optional(),
  password: z
    .string()
    .min(USER_PASSWORD_MIN_LENGTH)
    .max(USER_PASSWORD_MAX_LENGTH)
    .optional(),
  email: z
    .string()
    .min(USER_EMAIL_MIN_LENGTH)
    .max(USER_EMAIL_MAX_LENGTH)
    .regex(USER_EMAIL_REGEX)
    .optional(),
  name: z
    .string()
    .min(USER_NAME_MIN_LENGTH)
    .max(USER_NAME_MAX_LENGTH)
    .optional(),
  biography: z
    .string()
    .min(USER_BIOGRAPHY_MIN_LENGTH)
    .max(USER_BIOGRAPHY_MAX_LENGTH)
    .optional()
    .nullable(),
});

export type PutMeDto = z.infer<typeof PutMeSchema>;
