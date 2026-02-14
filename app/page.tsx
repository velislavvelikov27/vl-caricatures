import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/components/Shell";

const portfolio = Array.from({ length: 8 }).map((_, i) => `/portfolio/${i + 1}.png`);



export default function Home() {
  return (
    <Shell>
      <section className="hero">
        <div>
          <span className="pill">Secure orders • Login • Optional 2FA</span>
          <h1 className="h1">Custom digital caricatures from your photos</h1>
          <p className="p">
            Perfect for gifts, couples, birthdays, and special occasions. Get a high-resolution digital file in 2–4 days.
          </p>

          <div className="row" style={{ marginTop: 14 }}>
            <Link className="btn btn-primary" href="/signup">Create account</Link>
            <a className="btn" href="#pricing">View pricing</a>
            <Link className="btn" href="/login">Log in</Link>
          </div>

          <div className="grid grid-2 section">
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>2FA (Authenticator)</div>
              <div className="small" style={{ marginTop: 4 }}>Extra protection for client accounts</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>Private uploads</div>
              <div className="small" style={{ marginTop: 4 }}>Only the owner can access uploaded photos</div>
            </div>
          </div>
        </div>

        <div className="card hero-card">
          <div className="grid grid-2">
            {portfolio.slice(0, 4).map((src) => (
              <div key={src} className="thumb">
                <Image src={src} alt="portfolio" width={800} height={800} />
              </div>
            ))}
          </div>
          <div className="small" style={{ marginTop: 10 }}>All caricatures are 100% hand-drawn digitally.</div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ margin: "0 0 10px", fontWeight: 950, letterSpacing: "-.4px" }}>Portfolio</h2>
        <div className="grid grid-4">
          {portfolio.map((src) => (
            <div key={src} className="thumb">
              <Image src={src} alt="portfolio" width={800} height={800} />
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section">
        <h2 style={{ margin: "0 0 10px", fontWeight: 950, letterSpacing: "-.4px" }}>Pricing</h2>

        <div className="grid grid-2">
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Size 21 × 30 cm (A4)</h3>
            <div className="small">1 face — 25€ (no frame) / 30€ (framed)</div>
            <div className="small">2 faces — 30€ (no frame) / 35€ (framed)</div>
            <div className="small">3 faces — 35€ (no frame) / 40€ (framed)</div>
            <div className="small">4 faces — 40€ (no frame) / 45€ (framed)</div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Size 30 × 40 cm</h3>
            <div className="small">1 face — 35€ (no frame) / 40€ (framed)</div>
            <div className="small">2 faces — 40€ (no frame) / 45€ (framed)</div>
            <div className="small">3 faces — 45€ (no frame) / 50€ (framed)</div>
            <div className="small">4 faces — 50€ (no frame) / 55€ (framed)</div>
          </div>
        </div>

        <div className="card section" style={{ padding: 18, background: "var(--soft)" }}>
          <div>➕ Each additional face: +5€</div>
          <div>💡 Custom idea request: +5€</div>
          <div>⏳ Production time: 2–4 days 😁</div>
        </div>
      </section>

      <section className="section card" style={{ padding: 18 }}>
        <h2 style={{ marginTop: 0 }}>Secure Access</h2>
        <p className="p" style={{ marginTop: 8 }}>
          Member login + protected dashboard. Optional 2FA (TOTP) via Google/Microsoft Authenticator reduces risk if a password is compromised.
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <Link className="btn" href="/security">Manage 2FA</Link>
          <Link className="btn btn-primary" href="/order">Create order</Link>
        </div>
      </section>
    </Shell>
  );
}
