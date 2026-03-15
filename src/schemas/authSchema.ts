import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export const signinSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export type SigninInput = z.infer<typeof signinSchema>;
