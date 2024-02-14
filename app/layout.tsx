// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "./globals.css"

import { Poppins, Fira_Sans } from 'next/font/google'

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Deep Dive Searchable Playlist',
  description: 'Search, filter, & sort all of the Deep Dive recommendations in one place.',
};

const poppins = Poppins(
  {
    weight: ["400", "500", "600", "700", "800", "900"], 
    subsets: ["latin"]
  }
)

const firaSans = Fira_Sans(
  {
    weight: ["400", "500", "600", "700", "800", "900"], 
    subsets: ["latin"]
  }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={{ fontFamily: firaSans.style.fontFamily, headings: {fontFamily: poppins.style.fontFamily} }}
        defaultColorScheme='light'>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}