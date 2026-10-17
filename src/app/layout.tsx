import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chef Tariq Al-Amad | Exclusive Friday Levantine Dining & Terroir',
  description:
    'An intimate gourmet dining experience opening strictly on Fridays. Hand-crafted weekly rotating menu sourced 100% from organic farms in Ajloun, Jerash, and the Jordan Valley.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0B192C] text-[#FDFBF7] selection:bg-[#C5A880] selection:text-[#0B192C]">
        {children}
      </body>
    </html>
  );
}
