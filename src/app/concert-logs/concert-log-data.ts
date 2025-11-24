import { z } from 'zod/v4';

export const concertLogSchema = z.object({
  id: z.number(),
  review: z.string(),
  rating: z.number(),
  liked: z.boolean(),
  concertId: z.number(),
  userId: z.string(),
});
export type ConcertLogData = z.infer<typeof concertLogSchema>;

export const concertLogFormSchema = concertLogSchema.omit({
  id: true,
});

export type ConcertLogFormValues = z.infer<typeof concertLogFormSchema>;
