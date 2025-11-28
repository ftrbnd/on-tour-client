import { z } from 'zod/v4';
import { concertSchema } from '../concerts/concert-data';
import { userSchema } from '../users/user-data';

export const concertLogSchema = z.object({
  id: z.number(),
  review: z.string().max(300),
  rating: z.number().min(1).max(5),
  liked: z.boolean(),
  concertId: z.number(),
  userId: z.string(),
  get concert() {
    return concertSchema.omit({ concertLogs: true }).optional();
  },
  get user() {
    return userSchema.omit({ concertLogs: true }).optional();
  },
});
export type ConcertLogData = z.infer<typeof concertLogSchema>;

export const concertLogFormSchema = concertLogSchema.omit({
  id: true,
  userId: true,
  concert: true,
  user: true,
});
export type ConcertLogFormValues = z.infer<typeof concertLogFormSchema>;

export const updateConcertLogFormSchema = concertLogFormSchema
  .omit({
    concertId: true,
  })
  .extend({
    id: z.number(),
  });
export type UpdateConcertLogFormValues = z.infer<typeof updateConcertLogFormSchema>;
