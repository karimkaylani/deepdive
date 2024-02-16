// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "./globals.css"

import { Poppins, Fira_Sans } from 'next/font/google'

import { ColorSchemeScript, MantineProvider, Title, Image, Stack, Paper, Group, Text, Anchor } from '@mantine/core';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/options';
import { primaryColor } from './colors';

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
          <Paper w={'100%'} p='lg' bg={'#141f4a'} radius='0px'>
            <Group justify='center'>
              <Anchor c={primaryColor} href='https://www.deepdivenewsletter.com/'><Text size='sm' c='white'>The Deep Dive Homepage</Text></Anchor>
            </Group>
          </Paper>
          <main>
            <Stack className='mt-5' align='center'>
              <Image src={'logo.png'} w={150}/>
              <Title ta='center' c={primaryColor} fw={650} order={1}>SEARCHABLE PLAYLIST</Title>
            </Stack>
            {children}
          </main>
        </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}