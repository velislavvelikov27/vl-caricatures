import Link from "next/link";
import Image from "next/image";
import { SocialFloat } from "@/components/SocialFloat";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="topbar">
  <div className="topbar-inner">
    🚚 Free delivery for orders over <b>50€</b> • 🔥 Up to <b>25% OFF</b> (limited time)
  </div>
</div>
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
  <a className="pill" href="/#contact">Contact</a>
  <a className="pill" href="/#portfolio">Products</a>
  <a className="pill" href="/#pricing">Pricing</a>

  <Link className="btn" href="/login">Login</Link>
  <Link className="btn btn-primary" href="/dashboard">Dashboard</Link>
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
      <SocialFloat />
      <main className="container">{children}</main>
<SocialFloat />
<footer className="footer"> ... </footer>
    </>
  );
}

