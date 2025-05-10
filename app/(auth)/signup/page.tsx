import { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Sign Up | Credenza",
  description: "Create your Credenza account",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="md:w-full sm:w-full">
        <div className="shadow sm:rounded-lg">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
