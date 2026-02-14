import "./globals.css";

export const metadata = {
  title: "V&L DIGITAL CARICATURES",
  description: "Secure orders with login + 2FA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
