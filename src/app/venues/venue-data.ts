import { z } from 'zod/v4';
import { concertSchema } from '../concerts/concert-data';

export const venueSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  imageUrl: z.url(),
  get concerts() {
    return z.array(concertSchema.omit({ venue: true }));
  },
});

export type VenueData = z.infer<typeof venueSchema>;
