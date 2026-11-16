import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Is Coming. Are We Ready? — AI & Communication Management',
  description: 'An interactive research story about AI adoption, knowledge and impact in communication management.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
