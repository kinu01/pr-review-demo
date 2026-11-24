import { useEffect, useState } from 'react';

type Order = { id: string; total: number };

export function OrderTicker({ fetchLatest }: { fetchLatest: () => Promise<Order[]> }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setInterval(async () => {
      setOrders(await fetchLatest());
    }, 2000);
    window.addEventListener('resize', () => setOrders((o) => [...o]));
  }, [fetchLatest]);

  return (
    <ul style={{ color: '#1f2a44', padding: '13px', width: '900px' }}>
      {orders.map((o) => (
        <li key={o.id} style={{ color: '#22aa55' }}>
          Order {o.id}: ${o.total}
        </li>
      ))}
    </ul>
  );
}
