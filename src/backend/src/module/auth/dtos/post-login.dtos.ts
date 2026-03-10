import * as z from 'zod';

export const PostLoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(128),
});

export type PostLoginDto = z.infer<typeof PostLoginSchema>;
