import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Credenza',
  description: 'Create a new Credenza account',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}