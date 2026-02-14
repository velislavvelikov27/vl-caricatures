"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";
import { QRCodeCanvas } from "qrcode.react";

type EnrollData = {
  id: string;
  type: "totp";
  totp: { uri: string };
};

export default function SecurityPage() {
  const router = useRouter();

  const [enroll, setEnroll] = useState<EnrollData | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
    })();
  }, [router]);

  async function startEnroll() {
    setMsg("");
    setLoading(true);
    setEnroll(null);

    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });

    setLoading(false);
    if (error) return setMsg(error.message);

    setEnroll(data as any);
  }

  async function verifyEnroll() {
    if (!enroll) return;
    setMsg("");
    setLoading(true);

    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: enroll.id,
      code,
    });

    setLoading(false);
    if (error) return setMsg(error.message);

    setMsg("✅ 2FA enabled! Next time you sign in, you’ll be asked for a 6-digit code.");
    setEnroll(null);
    setCode("");
  }

  return (
    <Shell>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Security (2FA)</h1>
        <div className="row">
          <Link className="btn" href="/dashboard">Dashboard</Link>
          <Link className="btn" href="/orders">Orders</Link>
        </div>
      </div>

      <section className="section card" style={{ padding: 18, maxWidth: 760 }}>
        <p className="p" style={{ marginTop: 0 }}>
          Enable Two-Factor Authentication (TOTP) using Google/Microsoft Authenticator.
        </p>

        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={startEnroll} disabled={loading}>
            Enable 2FA
          </button>
        </div>

        {enroll && (
          <div className="section card" style={{ padding: 18, background: "var(--soft)" }}>
            <h2 style={{ marginTop: 0 }}>Step 1: Scan QR</h2>
            <div style={{ background: "white", padding: 12, display: "inline-block", borderRadius: 12 }}>
              <QRCodeCanvas value={enroll.totp.uri} size={190} />
            </div>

            <h2 className="section">Step 2: Enter the 6-digit code</h2>
            <div className="row">
              <input className="input" style={{ maxWidth: 180 }} placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={6} />
              <button className="btn btn-primary" onClick={verifyEnroll} disabled={loading || code.length !== 6}>
                Verify
              </button>
            </div>
            <p className="small" style={{ marginTop: 10 }}>
              Tip: keep a backup of your Authenticator, otherwise you may lose access.
            </p>
          </div>
        )}

        {msg && <p className="small" style={{ marginTop: 12 }}>{msg}</p>}
      </section>
    </Shell>
  );
}
