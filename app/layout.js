import "./globals.css";

export const metadata = {
  title: "MyLeadWorld | Unified Outreach Platform",
  description: "B2B LinkedIn Automation and AI Warmup Ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#020617' }}>{children}</body>
    </html>
  );
}
