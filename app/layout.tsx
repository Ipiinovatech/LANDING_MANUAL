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

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '361600304689226');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=361600304689226&ev=PageView&noscript=1"
          />
        </noscript>
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