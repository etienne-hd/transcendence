import * as z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(128),
});

export type LoginDto = z.infer<typeof LoginSchema>;
