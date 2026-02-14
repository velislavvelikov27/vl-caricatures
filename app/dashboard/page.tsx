"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";

type OrderRow = {
  id: string;
  created_at: string;
  size: string;
  faces: number;
  frame: boolean;
  custom_idea: boolean;
  status: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) return router.push("/login");
      setEmail(userRes.user.email ?? "");

      const { data, error } = await supabase
        .from("orders")
        .select("id,created_at,size,faces,frame,custom_idea,status")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) return setMsg(error.message);
      setOrders((data ?? []) as any);
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <Shell>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0 }}>Client Dashboard</h1>
          <div className="small">{email}</div>
        </div>

        <div className="row">
          <Link className="btn" href="/order">New order</Link>
          <Link className="btn" href="/orders">All orders</Link>
          <Link className="btn" href="/security">2FA</Link>
          <button className="btn btn-primary" onClick={logout}>Log out</button>
        </div>
      </div>

      <section className="section">
        <div className="card" style={{ padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Recent orders</h2>
          <p className="small" style={{ marginTop: 6 }}>
            Orders are protected with Row Level Security (only the owner can access them).
          </p>

          {msg && <p className="small">{msg}</p>}

          <div className="table" style={{ marginTop: 12 }}>
            <div className="tr head">
              <div>Order</div><div>Size</div><div>Faces</div><div>Status</div>
            </div>

            {orders.map((o) => (
              <div className="tr" key={o.id}>
                <div style={{ opacity: 0.85 }}>{o.id.slice(0, 8)}…</div>
                <div>{o.size}</div>
                <div>{o.faces}</div>
                <div>{o.status}</div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="tr">
                <div style={{ gridColumn: "1 / -1" }} className="small">
                  No orders yet. Create one from <Link href="/order">New order</Link>.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
