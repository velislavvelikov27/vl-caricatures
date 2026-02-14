"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";

type Factor = { id: string; factor_type: "totp"; status: string };

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [needsMfa, setNeedsMfa] = useState(false);
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");

  const [msg, setMsg] = useState("");

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return setMsg(error.message);

    const { data: factorsData, error: facErr } = await supabase.auth.mfa.listFactors();
    if (facErr) return router.push("/dashboard");

    const totp = (factorsData?.totp ?? []) as Factor[];
    const verified = totp.find((f) => f.status === "verified");

    if (verified?.id) {
      setNeedsMfa(true);
      setFactorId(verified.id);
      setMsg("Enter your 6-digit Authenticator code to complete sign-in.");
      return;
    }

    router.push("/dashboard");
  }

  async function onVerifyMfa(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
    if (error) return setMsg(error.message);

    router.push("/dashboard");
  }

  return (
    <Shell>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 18 }}>
        <h1 style={{ marginTop: 0 }}>Log in</h1>

        {!needsMfa ? (
          <form className="form" onSubmit={onLogin}>
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="input" placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
            <button className="btn btn-primary" type="submit">Log in</button>
          </form>
        ) : (
          <form className="form" onSubmit={onVerifyMfa}>
            <input className="input" placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={6} required />
            <button className="btn btn-primary" type="submit" disabled={code.length !== 6}>Verify 2FA</button>
            <button className="btn" type="button" onClick={() => { setNeedsMfa(false); setFactorId(""); setCode(""); setMsg(""); }}>
              Back
            </button>
          </form>
        )}

        {msg && <p className="small" style={{ marginTop: 10 }}>{msg}</p>}

        <p className="small" style={{ marginTop: 12 }}>
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </Shell>
  );
}
