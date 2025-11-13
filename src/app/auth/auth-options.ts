import { z } from 'zod/v4';

export const TOKEN_KEY = 'token';

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
});
export type LoginResult = z.infer<typeof loginResultSchema>;
