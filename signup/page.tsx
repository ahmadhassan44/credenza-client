import { Card } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <div className="md:w-full sm:w-full">
        <Card className="shadow sm:rounded-lg">
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
