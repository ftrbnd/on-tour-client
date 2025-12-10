import { z } from 'zod/v4';
import { concertLogSchema } from '../concert-logs/concert-log-data';
import { commentSchema } from '../comments/comment-data';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.email(),
  get concertLogs() {
    return concertLogSchema.omit({ user: true }).array().optional();
  },
  get comments() {
    return commentSchema.omit({ user: true }).array().optional();
  },
});
export type UserData = z.infer<typeof userSchema>;
