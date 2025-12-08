import { z } from 'zod/v4';
import { concertSchema } from '../concerts/concert-data';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const venueSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  imageUrl: z.url().optional().nullable(),
  get concerts() {
    return z.array(concertSchema.omit({ venue: true })).optional();
  },
});
export type VenueData = z.infer<typeof venueSchema>;

export const venueFormSchema = venueSchema.omit({
  id: true,
  concerts: true,
});
export type VenueFormValues = z.infer<typeof venueFormSchema>;

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { error } = z.url().safeParse(control.value);

    return error ? { invalidUrl: { value: control.value } } : null;
  };
}
