import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password | Credenza',
  description: 'Reset your Credenza account password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ForgotPasswordForm />
        </Card>
      </div>
    </div>
  );
}