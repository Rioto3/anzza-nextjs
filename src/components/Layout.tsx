// src/components/Layout.tsx

import React, { ReactNode } from 'react';
import Head from 'next/head';
import { PlasmicRootProvider } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../../plasmic-init';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = 'ANZZA - Default Title',
  description = 'Anzza web application built with Next.js and Plasmic',
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlasmicRootProvider loader={PLASMIC}>
        {children}
      </PlasmicRootProvider>
    </>
  );
}