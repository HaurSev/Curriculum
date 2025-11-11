import * as z from 'zod';

export type ForgotPasswordData = {
  email: string;
};

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
});
