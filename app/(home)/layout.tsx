import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credenza | Credit Scoring for Digital Creators',
  description: 'Evaluate creditworthiness for digital creators by analyzing platform metrics, income stability, and growth patterns',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
