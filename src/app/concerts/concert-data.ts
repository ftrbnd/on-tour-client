import { artistSchema } from '../artists/artist-data';
import { concertLogSchema } from '../concert-logs/concert-log-data';
import { venueSchema } from '../venues/venue-data';
import { z } from 'zod/v4';

export const concertSchema = z.object({
  id: z.number(),
  date: z.string(),
  tour: z.string(),
  artistId: z.string(),
  venueId: z.string(),
  get venue() {
    return venueSchema.omit({ concerts: true }).optional();
  },
  get artist() {
    return artistSchema.omit({ concerts: true }).optional();
  },
  get concertLogs() {
    return concertLogSchema.array().optional();
  },
});
export type ConcertData = z.infer<typeof concertSchema>;

export const concertFormSchema = concertSchema
  .omit({
    id: true,
    attendees: true,
    artist: true,
    venue: true,
    concertLogs: true,
  })
  .extend({
    artistId: z.number(),
    venueId: z.number(),
  });

export type ConcertFormValues = z.infer<typeof concertFormSchema>;
