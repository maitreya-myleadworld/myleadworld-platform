import "./globals.css";

export const metadata = {
  title: "MyLeadWorld | Unified Outreach Ecosystem",
  description: "LinkedIn Automation & AI Warmup Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#020617]">{children}</body>
    </html>
  );
}
