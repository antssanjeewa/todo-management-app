import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TaskFlow - Smart Task Management',
  description: 'Premium Full-Stack Todo Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>

        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}