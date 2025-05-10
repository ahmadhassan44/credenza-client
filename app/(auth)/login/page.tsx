import { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | Credenza",
  description: "Sign in to your Credenza account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-full">
        <div className="shadow sm:rounded-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
