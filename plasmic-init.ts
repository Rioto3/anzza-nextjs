import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { HelloWorld } from '@/components/HelloWorld';
import { HeroSection } from '@/components/HeroSection';


export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_ID || "",  // ID of a project you are using
      token: process.env.PLASMIC_TOKEN || "",  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})


PLASMIC.registerComponent(HelloWorld, {
  name: 'HelloWorld',
  props: {
    verbose: 'boolean',
    children: 'slot'
  }
});

PLASMIC.registerComponent(HeroSection, {
  name: 'HeroSection',
  props: {
    initialImage: 'string',
    videoSrc: 'string',
    finalImage: 'string'
  },
});
