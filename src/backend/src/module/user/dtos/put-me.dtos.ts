import * as z from 'zod';

export const PutMeSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  password: z.string().min(8).max(128).optional(),
  email: z
    .string()
    .min(3)
    .max(320)
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .optional(),
  name: z.string().min(1).max(100).optional(),
  biography: z.string().min(1).max(200).optional().nullable(),
});

export type PutMeDto = z.infer<typeof PutMeSchema>;
