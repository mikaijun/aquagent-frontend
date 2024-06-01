import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'みずとも',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link href='/manifest.json' rel='manifest' />
        <link href='/icon.png' rel='apple-touch-icon'></link>
        <meta content='#60A5FA' name='theme-color' />
      </head>
      <body>{children}</body>
    </html>
  )
}
