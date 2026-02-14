"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";

type OrderRow = {
  id: string;
  created_at: string;
  size: string;
  faces: number;
  status: string;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) return router.push("/login");

      const { data, error } = await supabase
        .from("orders")
        .select("id,created_at,size,faces,status")
        .order("created_at", { ascending: false });

      if (error) return setMsg(error.message);
      setOrders((data ?? []) as any);
    })();
  }, [router]);

  return (
    <Shell>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>My Orders</h1>
        <div className="row">
          <Link className="btn" href="/dashboard">Dashboard</Link>
          <Link className="btn btn-primary" href="/order">New order</Link>
        </div>
      </div>

      {msg && <p className="small" style={{ marginTop: 10 }}>{msg}</p>}

      <section className="section card" style={{ padding: 18 }}>
        <div className="table">
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
                No orders yet.
              </div>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
