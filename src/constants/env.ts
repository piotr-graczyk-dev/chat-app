// import z from 'zod';

// const envSchema = z.object({
//   OPENAI_API_KEY: z.string().min(1),
// });

// const env = envSchema.safeParse({
//   OPENAI_API_KEY: process.env.OPENAI_API_KEY,
// });

// if (!env.success) {
//   throw new Error(
//     `There is an error with the server environment variables: ${env.error.message}`,
//   );
// }

// export const { OPENAI_API_KEY } = env.data;
