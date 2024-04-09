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
  LoginCredentialsValidator,
  LoginCredentialsValidatorProps,
} from "../../../lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsCustomer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentialsValidatorProps>({
    resolver: zodResolver(LoginCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error(
          "Invalid email or password! Please check your credentials."
        );
      }
    },
    onSuccess: () => {
      toast.success("You are successfully logged in!");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/admin");
        return;
      }

      router.push("/");
    },
  });

  const onSubmit = ({ email, password }: LoginCredentialsValidatorProps) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex p-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Login to your {isSeller ? "Seller " : ""}Account
            </h1>
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
                <Button>Sign In</Button>
              </div>
            </form>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </div>

          {isSeller ? (
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={continueAsCustomer}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={continueAsSeller}
            >
              Continue as seller
            </Button>
          )}
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-orange-600 font-semibold hover:underline hover:text-orange-700"
            >
              Sign up now
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
