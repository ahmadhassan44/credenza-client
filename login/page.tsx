import { Metadata } from "next";

import { Card } from "@heroui/react"; 
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | Credenza",
  description: "Sign in to your Credenza account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <div className="w-full">
        <Card className="shadow sm:rounded-lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
