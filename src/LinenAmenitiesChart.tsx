'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';

const linenData = [
  { item: 'Bed Sheet', used: 87, id: 'linen-bs' },
  { item: 'Pillow Case', used: 174, id: 'linen-pc' },
  { item: 'Bath Towel', used: 92, id: 'linen-bt' },
  { item: 'Hand Towel', used: 88, id: 'linen-ht' },
  { item: 'Bath Mat', used: 85, id: 'linen-bm' },
  { item: 'Duvet Cover', used: 43, id: 'linen-dc' },
];

const amenitiesData = [
  { item: 'Mineral Water', used: 176, id: 'amen-mw' },
  { item: 'Soap', used: 89, id: 'amen-so' },
  { item: 'Shampoo', used: 87, id: 'amen-sh' },
  { item: 'Coffee', used: 82, id: 'amen-co' },
  { item: 'Tea', used: 79, id: 'amen-te' },
  { item: 'Shower Cap', used: 67, id: 'amen-sc' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-2.5 shadow-xl text-xs">
      <p className="font-600 text-foreground">{label}</p>
      <p className="text-muted-foreground mt-1">Used: <span className="font-mono-data text-primary font-600">{payload[0]?.value} pcs</span></p>
    </div>
  );
};

export default function LinenAmenitiesChart() {
  const [tab, setTab] = useState<'linen' | 'amenities'>('linen');
  const activeData = tab === 'linen' ? linenData : amenitiesData;
  const barColor = tab === 'linen' ? '#3B82F6' : '#C9A84C';

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-600 text-foreground">Consumption Today</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Linen & amenities usage</p>
        </div>
        <div className="flex bg-muted rounded-lg p-0.5">
          {(['linen', 'amenities'] as const).map((t) => (
            <button
              key={`tab-${t}`}
              onClick={() => setTab(t)}
              className={`text-xs px-3 py-1.5 rounded-md font-500 transition-all ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t === 'linen' ? 'Linen' : 'Amenities'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={activeData} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <YAxis dataKey="item" type="category" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={72} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="used" fill={barColor} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}