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
            <Link className="btn btn-primary" href="/order">Order now</Link>
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
              <div className="small" style={{ marginTop: 4 }}>Protected storage + access policies</div>
            </div>
          </div>

          <div className="grid grid-2 section">
            <div className="card" style={{ padding: 16 }}>
              <div className="kpi"><b>2–4 days</b><span>production time</span></div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="kpi"><b>HD file</b><span>print-ready export</span></div>
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

      {/* HOW IT WORKS */}
      <section className="section">
        <h2 style={{ margin: "0 0 10px", fontWeight: 950, letterSpacing: "-.4px" }}>How it works</h2>
        <div className="grid grid-2">
          <div className="card" style={{ padding: 18 }}>
            <div className="badge">Step 1</div>
            <h3 style={{ margin: "10px 0 6px" }}>Send photos + details</h3>
            <p className="p" style={{ margin: 0 }}>
              Create an order, upload a photo, choose size, number of faces, frame option, and notes.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="badge">Step 2</div>
            <h3 style={{ margin: "10px 0 6px" }}>We draw your caricature</h3>
            <p className="p" style={{ margin: 0 }}>
              Hand-drawn digitally. Production time is usually 2–4 days depending on complexity.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="badge">Step 3</div>
            <h3 style={{ margin: "10px 0 6px" }}>Delivery</h3>
            <p className="p" style={{ margin: 0 }}>
              You receive a high-resolution digital file, ready for sharing or printing.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="badge">Security</div>
            <h3 style={{ margin: "10px 0 6px" }}>Protected client area</h3>
            <p className="p" style={{ margin: 0 }}>
              Login + optional 2FA. Orders are protected with Row Level Security (RLS) and private storage policies.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section">
        <h2 style={{ margin: "0 0 10px", fontWeight: 950, letterSpacing: "-.4px" }}>Portfolio</h2>
        <div className="grid grid-4">
          {portfolio.map((src) => (
            <div key={src} className="thumb">
              <Image src={src} alt="portfolio" width={800} height={800} />
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
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

        {/* WHAT YOU GET */}
        <div className="card section" style={{ padding: 18 }}>
          <h3 style={{ marginTop: 0 }}>What you get</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
            <li>High-resolution digital file (ready to share)</li>
            <li>Print-friendly size (A4 or 30×40)</li>
            <li>Secure client area with optional 2FA</li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section card" style={{ padding: 18 }}>
        <h2 style={{ marginTop: 0 }}>Contact</h2>
        <p className="p" style={{ marginTop: 8 }}>
          Fastest way to reach me: Instagram or Facebook.
        </p>
        <div className="row" style={{ marginTop: 10 }}>
          <a className="btn btn-primary" href="https://www.instagram.com/digitalcaricaturesbg/" target="_blank" rel="noreferrer">
            Instagram DM
          </a>
          <a className="btn" href="https://www.facebook.com/digitalcaricaturesbg" target="_blank" rel="noreferrer">
            Facebook Page
          </a>
          <Link className="btn" href="/order">Create order</Link>
        </div>
      </section>
    </Shell>
  );
}
