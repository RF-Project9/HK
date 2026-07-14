'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

const data = [
  { name: 'M.Santos', rooms: 8, avgMin: 38, id: 'prod-ms' },
  { name: 'J.Reyes', rooms: 7, avgMin: 42, id: 'prod-jr' },
  { name: 'A.Cruz', rooms: 9, avgMin: 35, id: 'prod-ac' },
  { name: 'P.Lim', rooms: 6, avgMin: 44, id: 'prod-pl' },
  { name: 'L.Ramos', rooms: 8, avgMin: 39, id: 'prod-lr' },
];

const barColors = ['#C9A84C', '#3B82F6', '#22C55E', '#A855F7', '#EAB308'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-xs">
      <p className="font-600 text-foreground mb-1">{label}</p>
      <p className="text-muted-foreground">Rooms: <span className="font-mono-data text-foreground font-600">{payload[0]?.value}</span></p>
      <p className="text-muted-foreground">Avg: <span className="font-mono-data text-foreground font-600">{payload[0]?.payload?.avgMin} min</span></p>
    </div>
  );
};

export default function ProductivityChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-600 text-foreground">Attendant Productivity</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Rooms completed · morning shift</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rooms" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.id} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold font-mono-data text-primary">38</p>
          <p className="text-xs text-muted-foreground">Avg rooms/day</p>
        </div>
        <div>
          <p className="text-lg font-bold font-mono-data text-green-400">39 min</p>
          <p className="text-xs text-muted-foreground">Avg duration</p>
        </div>
        <div>
          <p className="text-lg font-bold font-mono-data text-blue-400">94%</p>
          <p className="text-xs text-muted-foreground">Pass rate</p>
        </div>
      </div>
    </div>
  );
}