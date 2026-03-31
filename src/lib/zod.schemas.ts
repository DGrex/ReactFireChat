import { z } from "zod";

//Schema Login
export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>;

//Schema Register
export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email()),
    displayName: z
      .string()
      .min(1, "Diplay name is required")
      .max(50, "Diplay name must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not math",
    path: ["confirmPassword"],
  });

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;

//Schema Profile

export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name must be at most 50 characters long")
    .optional(),
  photoURL: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
});

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;

// Schema Tasks
export const taskZodSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .max(500, "Descriptions must be at most 500 characters long")
    .optional(),
});

export type TaskZodSchemaType = z.infer<typeof taskZodSchema>;

// Shcema Message
export const messageZodSchema = z.object({
  text: z.string().trim().min(1, "Escriba algo por favor"),
});

export type MessageZodSchemaType = z.infer<typeof messageZodSchema>;

// Shcema Buscar Amigo
export const emailFriendZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
});

export type EmailFriendZodSchemaType = z.infer<typeof emailFriendZodSchema>;
