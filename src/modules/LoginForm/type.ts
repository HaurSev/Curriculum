import * as z from 'zod';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginUserSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});
