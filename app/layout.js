export const metadata = {
  title: 'MyLeadWorld',
  description: 'Your Complete Outreach Ecosystem',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
