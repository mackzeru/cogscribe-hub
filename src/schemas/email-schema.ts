import { z } from "zod";

export const EmailSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(1, { message: "Recipient email is required" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject line is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Email content is required" })
    .max(50000, { message: "Content is too long" }),
});

export type EmailFormDataType = z.infer<typeof EmailSchema>;
