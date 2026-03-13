import {
  ZOD_USER_USERNAME,
  ZOD_USER_PASSWORD,
} from 'src/common/validators/zod-validation.rule';
import * as z from 'zod';

export const PostLoginSchema = z.object({
  username: ZOD_USER_USERNAME,
  password: ZOD_USER_PASSWORD,
});

export type PostLoginDto = z.infer<typeof PostLoginSchema>;
