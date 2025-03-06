// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";
import RootLayout from "./layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={pageProps.plasmicData}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </PlasmicRootProvider>
  );
}
