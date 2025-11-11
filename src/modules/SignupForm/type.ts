import * as z from 'zod';

export type SignupFormData = {
  email: string;
  password: string;
};

export const SignupUserSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});
