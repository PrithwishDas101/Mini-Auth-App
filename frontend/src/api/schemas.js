import { z } from 'zod';

// Authentication Schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Username can only contain letters, numbers, dots, underscores, and hyphens'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Story Schemas
export const createStorySchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  content: z.string()
    .min(10, 'Story must be at least 10 characters')
    .max(50000, 'Story must not exceed 50,000 characters')
    .trim(),
});

export const updateStorySchema = createStorySchema.partial().merge(
  z.object({
    id: z.string().min(1, 'Story ID is required'),
  })
);

// Profile Schemas
export const updateUsernameSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Username can only contain letters, numbers, dots, underscores, and hyphens'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(6, 'New password must be at least 6 characters')
    .min(1, 'New password is required'),
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
