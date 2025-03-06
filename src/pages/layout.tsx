
// layout.tsx
import { ReactNode } from "react";
import Head from 'next/head';
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>開発中でござい</title>
        <meta name="description" content="アプリ全体の説明" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PlasmicComponent component="Header" />
      {children}
    </div>
  );
}
