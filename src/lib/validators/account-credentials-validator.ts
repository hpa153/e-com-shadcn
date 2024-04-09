import { z } from "zod";

export const AuthCredentialsValidator = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: "Your password must be at least 6 - 14 characters long!",
      })
      .max(14, {
        message: "Your password must be at least 6 - 14 characters long!",
      }),
    confirmedPassword: z.string().min(6).max(14),
  })
  .refine(
    (values) => {
      return values.password === values.confirmedPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmedPassword"],
    }
  );

export type AuthCredentialsValidatorProps = z.infer<
  typeof AuthCredentialsValidator
>;

export const LoginCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Your password must be at least 6 - 14 characters long!",
    })
    .max(14, {
      message: "Your password must be at least 6 - 14 characters long!",
    }),
});

export type LoginCredentialsValidatorProps = z.infer<
  typeof LoginCredentialsValidator
>;
