import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form-fixed';

export const metadata: Metadata = {
  title: 'Sign Up | Credenza',
  description: 'Create your Credenza account',
};

export default function SignupPage() {
  return <RegisterForm />;
}
