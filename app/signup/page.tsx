"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signUp({ email, password: pass });
    if (error) return setMsg(error.message);

    setMsg("Account created. Now log in.");
  }

  return (
    <Shell>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 18 }}>
        <h1 style={{ marginTop: 0 }}>Sign up</h1>

        <form className="form" onSubmit={onSubmit}>
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>

        {msg && <p className="small" style={{ marginTop: 10 }}>{msg}</p>}

        <p className="small" style={{ marginTop: 12 }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </Shell>
  );
}
