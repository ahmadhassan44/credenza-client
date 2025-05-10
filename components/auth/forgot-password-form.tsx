"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input, Button } from "@heroui/react";

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/validations/auth";
import { CredenzaLogo } from "@/components/ui/credenzaLogo";
import apiClient from "@/services/api/client";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call the forgot password API endpoint
      await apiClient.post("/auth/forgot-password", { email: data.email });
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred. Please try again.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <CredenzaLogo />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {success ? (
          <div className="rounded-md bg-green-900/30 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-400">
                  Password reset email sent. Check your inbox for further
                  instructions.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label
                className="block text-sm font-medium leading-6 text-white"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  color={form.formState.errors.email ? "danger" : "default"}
                  errorMessage={form.formState.errors.email?.message}
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  {...form.register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-900"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <div>
              <Button
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                color="primary"
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </div>
          </form>
        )}

        <p className="mt-10 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            href="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
