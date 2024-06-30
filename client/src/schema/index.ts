import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .max(80, {
      message: "Short description must not be longer than 80 characters.",
    })
    .optional(),
  category: z.string().min(1, {
    message: "Category cannot be empty.",
  }),
  completed: z.coerce.boolean(),
});
export type TaskFormValues = z.infer<typeof taskFormSchema>;

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z
    .string()
    .email("This is not a valid email.")
    .min(4, { message: "Name is required" })
    .max(55, { message: "Name is too long" }),
  password: z
    .string()
    .min(6, { message: "Password is required" })
    .max(40, { message: "Password is too long" })
    .optional()
    .or(z.literal("")),
  role: z.enum(["TECH", "ADMIN", "USER"]).default("USER"),
});
