import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TaskFlow - Smart Task Management',
  description: 'Premium Full-Stack Todo Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}

        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}