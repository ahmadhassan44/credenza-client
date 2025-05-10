import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password | Credenza',
  description: 'Reset your Credenza account password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
