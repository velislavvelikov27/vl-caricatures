import Link from "next/link";
import Image from "next/image";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <Image src="/logo.png" alt="V&L" width={44} height={44} />
            <div>
              <div className="brand-title">V&L DIGITAL CARICATURES</div>
              <div className="brand-sub">Digital caricatures from photos</div>
            </div>
          </Link>

          <nav className="nav">
            <a className="pill" href="/#pricing">Pricing</a>
            <a className="pill" href="/#contact">Contact</a>

            <Link className="pill" href="/orders">Orders</Link>
            <Link className="pill" href="/security">2FA</Link>
            <Link className="btn btn-primary" href="/dashboard">Dashboard</Link>

            <a
              className="pill"
              href="https://www.instagram.com/digitalcaricaturesbg/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              className="pill"
              href="https://www.facebook.com/digitalcaricaturesbg"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </nav>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="small">© {new Date().getFullYear()} V&L DIGITAL CARICATURES</div>
          <div className="row">
            <a className="pill" href="https://www.instagram.com/digitalcaricaturesbg/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="pill" href="https://www.facebook.com/digitalcaricaturesbg" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}

