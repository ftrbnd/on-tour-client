import z from 'zod/v4';
import { concertLogSchema } from '../concert-logs/concert-log-data';
import { userSchema } from '../users/user-data';

export const commentSchema = z.object({
  id: z.number(),
  concertLogId: z.number(),
  userId: z.string(),
  text: z.string().max(300),
  date: z.date(),
  get concertLog() {
    return concertLogSchema.omit({ comments: true }).optional();
  },
  get user() {
    return userSchema.omit({ comments: true }).optional();
  },
});
export type CommentData = z.infer<typeof commentSchema>;

export const commentFormSchema = commentSchema.pick({
  text: true,
  concertLogId: true,
});
export type CommentFormValues = z.infer<typeof commentFormSchema>;
