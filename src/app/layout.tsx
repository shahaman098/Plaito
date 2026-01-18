import type { Metadata } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from '@/providers';
import { ConnectWallet } from '@/components/ConnectWallet';

const inter = Inter({ subsets: ['latin'] });
const cinzel = Cinzel_Decorative({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel'
});

export const metadata: Metadata = {
  title: 'PearTerminal',
  description: 'Gamified Pair Trading on Pear Protocol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cinzel.variable}`}>
        <Providers>
          <div className="min-h-screen bg-neutral-950 text-white selection:bg-green-500/30">
            <header className="flex items-center justify-between px-0 py-4 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50 w-full">
              <div className="flex items-center gap-2 pl-6">
                <h1 className={`${cinzel.className} text-2xl font-black text-[#FFD700] tracking-[0.15em]`} style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(218,165,32,0.5)'
                }}>PLAITO</h1>
              </div>
              <div className="pr-6">
                <ConnectWallet />
              </div>
            </header>
            <main className="container mx-auto p-6 max-w-6xl">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
