import { z } from 'zod/v4';
import { concertLogSchema } from '../concert-logs/concert-log-data';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.email(),
  get concertLogs() {
    return concertLogSchema.omit({ user: true }).array().optional();
  },
});
export type UserData = z.infer<typeof userSchema>;
