import "./globals.css";

export const metadata = {
  title: "MyLeadWorld | Live Platform",
  description: "Unified Outreach Ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#020617' }}>{children}</body>
    </html>
  );
}
