import "./globals.css";

export const metadata = {
  title: "MyLeadWorld | Deliverability Meets Automation",
  description: "The unified platform for LinkedIn automation and email warmup.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#020617' }}>{children}</body>
    </html>
  );
}
