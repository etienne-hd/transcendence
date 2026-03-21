import {
  ZOD_USER_AVATAR,
  ZOD_USER_BIOGRAPHY,
  ZOD_USER_EMAIL,
  ZOD_USER_NAME,
  ZOD_USER_PASSWORD,
  ZOD_USER_USERNAME,
} from '../../../common/validators/zod-validation.rule';
import * as z from 'zod';

export const PutMeSchema = z.object({
  username: ZOD_USER_USERNAME.optional(),
  password: ZOD_USER_PASSWORD.optional(),
  email: ZOD_USER_EMAIL.optional(),
  name: ZOD_USER_NAME.optional(),
  biography: ZOD_USER_BIOGRAPHY.optional().nullable(),
  avatar: ZOD_USER_AVATAR.optional(),
});

export type PutMeDto = z.infer<typeof PutMeSchema>;
