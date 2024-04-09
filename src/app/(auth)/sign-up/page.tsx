"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AuthCredentialsValidator,
  AuthCredentialsValidatorProps,
} from "../../../lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentialsValidatorProps>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error(
          "This email has already been used. Please sign on or register with another email."
        );
        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Something went wrong! Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({
    email,
    password,
    confirmedPassword,
  }: AuthCredentialsValidatorProps) => {
    mutate({ email, password, confirmedPassword });
  };

  return (
    <>
      <div className="container relative flex p-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email" className="mb-1">
                    E-Mail:
                  </Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="your-email@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password" className="mb-1">
                    Password:
                  </Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Your Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="confirmedPassword" className="mb-1">
                    Confirm Password:
                  </Label>
                  <Input
                    {...register("confirmedPassword")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.confirmedPassword,
                    })}
                    placeholder="Confirm Password"
                  />
                  {errors?.confirmedPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmedPassword.message}
                    </p>
                  )}
                </div>
                <Button>Register</Button>
              </div>
            </form>
          </div>
          <p>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-orange-600 font-semibold hover:underline hover:text-orange-700"
            >
              Sign in here
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
