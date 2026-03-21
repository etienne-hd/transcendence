import {
  ZOD_USER_EMAIL,
  ZOD_USER_NAME,
  ZOD_USER_PASSWORD,
  ZOD_USER_USERNAME,
} from '../../../common/validators/zod-validation.rule';
import * as z from 'zod';

export const PostRegisterSchema = z.object({
  username: ZOD_USER_USERNAME,
  password: ZOD_USER_PASSWORD,
  email: ZOD_USER_EMAIL,
  name: ZOD_USER_NAME,
});

export type PostRegisterDto = z.infer<typeof PostRegisterSchema>;
