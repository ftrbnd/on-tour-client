import { artistSchema } from '../artists/artist-data';
import { venueSchema } from '../venues/venue-data';
import { z } from 'zod/v4';

export const concertSchema = z.object({
  id: z.number(),
  date: z.date(),
  tour: z.string(),
  get venue() {
    return venueSchema.omit({ concerts: true });
  },
  get artist() {
    return artistSchema.omit({ concerts: true });
  },
  attendees: z.array(z.any()), // TODO: add User schema
});
export type ConcertData = z.infer<typeof concertSchema>;

export const concertFormSchema = concertSchema
  .omit({
    id: true,
    attendees: true,
    artist: true,
    venue: true,
  })
  .extend({
    artistId: z.number(),
    venueId: z.number(),
  });

export type ConcertFormValues = z.infer<typeof concertFormSchema>;
