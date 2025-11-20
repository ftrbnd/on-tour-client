import { z } from 'zod/v4';
import { concertSchema } from '../concerts/concert-data';

export const artistSchema = z.object({
  id: z.number(),
  spotifyId: z.string(),
  name: z.string(),
  imageUrl: z.url(),
  url: z.url(),
  get concerts() {
    return z.array(concertSchema.omit({ artist: true })).optional();
  },
});

export type ArtistData = z.infer<typeof artistSchema>;
