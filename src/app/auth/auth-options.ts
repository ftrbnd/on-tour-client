import { z } from 'zod/v4';

export const TOKEN_KEY = 'token';

export const authRequestSchema = z.object({
  username: z.string(),
  email: z.email().optional(),
  password: z.string(),
});
export type AuthRequest = z.infer<typeof authRequestSchema>;

export const authResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
});
export type AuthResponse = z.infer<typeof authResponseSchema>;
