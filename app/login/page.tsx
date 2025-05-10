import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In | Credenza',
  description: 'Sign in to your Credenza account',
};

export default function LoginPage() {
  return <LoginForm />;
}
