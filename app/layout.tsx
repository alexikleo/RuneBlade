import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Runeblade — First Trial', description: 'Tap your sword, cast magic, and block to survive.', appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Runeblade' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#101e25' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
