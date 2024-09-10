import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email("Invalid Email Format"),
  password: z.string().min(6, "Password must be 6 character long"),
});
