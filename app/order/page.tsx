"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { calcPriceEUR } from "@/lib/price";
import { Shell } from "@/components/Shell";

type Size = "A4_21x30" | "30x40";

export default function OrderPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<Size>("A4_21x30");
  const [faces, setFaces] = useState(1);
  const [frame, setFrame] = useState(false);
  const [customIdea, setCustomIdea] = useState(false);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return router.push("/login");
      setUserId(data.user.id);
      setEmail(data.user.email ?? "");
    })();
  }, [router]);

  const price = useMemo(() => calcPriceEUR({ size, faces, frame, customIdea }), [size, faces, frame, customIdea]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    let photo_path: string | null = null;

    if (file) {
      const safeName = file.name.replaceAll(" ", "_");
      const path = `${userId}/${Date.now()}_${safeName}`;

      const { error: upErr } = await supabase.storage.from("order-photos").upload(path, file, { upsert: false });
      if (upErr) return setMsg(upErr.message);

      photo_path = path;
    }

    const { error } = await supabase.from("orders").insert({
      user_id: userId,
      full_name: fullName,
      email,
      size,
      faces,
      frame,
      custom_idea: customIdea,
      notes,
      photo_path,
    });

    if (error) return setMsg(error.message);

    router.push("/orders");
  }

  return (
    <Shell>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>New Order</h1>
        <div className="row">
          <Link className="btn" href="/dashboard">Dashboard</Link>
          <Link className="btn" href="/orders">Orders</Link>
        </div>
      </div>

      <section className="section card" style={{ padding: 18, maxWidth: 720 }}>
        <p className="small" style={{ marginTop: 0 }}>
          Estimated total: <b>{price} €</b>
        </p>

        <form className="form" onSubmit={submit}>
          <input className="input" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>
            Size
            <select value={size} onChange={(e) => setSize(e.target.value as Size)}>
              <option value="A4_21x30">21×30 (A4)</option>
              <option value="30x40">30×40</option>
            </select>
          </label>

          <label>
            Number of faces
            <input className="input" type="number" min={1} value={faces} onChange={(e) => setFaces(parseInt(e.target.value || "1", 10))} />
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="checkbox" checked={frame} onChange={(e) => setFrame(e.target.checked)} />
            Frame included
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="checkbox" checked={customIdea} onChange={(e) => setCustomIdea(e.target.checked)} />
            Custom idea request (+5€)
          </label>

          <label>
            Notes (optional)
            <textarea className="input" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
          </label>

          <label>
            Upload photo (optional)
            <input className="input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>

          <button className="btn btn-primary" type="submit">Submit order</button>
        </form>

        {msg && <p className="small" style={{ marginTop: 10 }}>{msg}</p>}
      </section>
    </Shell>
  );
}
