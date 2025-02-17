// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/Footer';
import { VirtualAssistant } from '@/components/chat/VirtualAssistant';

const inter = Inter({ subsets: ['latin'] }) as { className: string };

export const metadata: Metadata = {
  title: 'Ipinnovatech - Red Multiservicios de IA',
  description: 'IPINNOVATECH es una compañía de tecnología TI en el área de servicios ITO y BPO con más de 13 años en mercado.',
  metadataBase: new URL('https://ipinnovatech.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z73NE0F1KP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z73NE0F1KP');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          {children}
          <VirtualAssistant />
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
