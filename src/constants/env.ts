import z from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
});

const env = envSchema.safeParse({
  API_URL: process.env.EXPO_PUBLIC_API_URL,
});

if (!env.success) {
  throw new Error(
    `There is an error with the server environment variables: ${env.error.message}`,
  );
}

export const { API_URL } = env.data;
