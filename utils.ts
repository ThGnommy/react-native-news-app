import { z } from "zod";

export const validateEmail = () => {
  return z.object({
    email: z.string().email({ message: "email is required?" }),
  });
};
