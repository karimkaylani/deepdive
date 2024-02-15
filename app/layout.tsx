// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "./globals.css"

import { Poppins, Fira_Sans } from 'next/font/google'

import { ColorSchemeScript, MantineProvider, Title, Image, Stack } from '@mantine/core';
import { secondaryColor } from './globals';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/options';

export const metadata = {
  title: 'Searchable Playlist',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider session={session}>
        <MantineProvider theme={{ fontFamily: firaSans.style.fontFamily, headings: {fontFamily: poppins.style.fontFamily} }}
        defaultColorScheme='light'>
          <Stack className='mt-5' align='center'>
            <Image src={'logo.png'} w={150}/>
            <Title ta='center' c={secondaryColor} fw={650} order={1}>SEARCHABLE PLAYLIST</Title>
          </Stack>
          {children}
        </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}