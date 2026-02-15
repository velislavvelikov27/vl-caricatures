import "./globals.css";

export const metadata = {
  title: "V&L Digital Caricatures",
  description: "Secure caricature orders with optional 2FA.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

