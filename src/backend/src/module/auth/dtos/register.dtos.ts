import * as z from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(128),
  email: z
    .string()
    .min(3)
    .max(320)
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  name: z.string().min(1).max(100),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
