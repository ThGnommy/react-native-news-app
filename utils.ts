import { z } from "zod";

export const validateUserCredential = (email: string, password: string) => {
  const User = z.object({
    email: z.string().email({ message: "Insert a valid Email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be minimum 8 characters." })
      .trim(),
  });

  return User.safeParse({ email, password });
};
