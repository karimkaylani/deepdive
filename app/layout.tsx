// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import "./globals.css"

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'DeepDive',
  description: 'Test Description',
};

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
        <MantineProvider theme={{ fontFamily: 'Inter, sans-serif', headings: {fontFamily: 'Poppins, sans-serif'} }}
        defaultColorScheme='light'>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}