'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', departure: 28, stayOver: 45, vip: 4, deep: 2 },
  { day: 'Tue', departure: 22, stayOver: 51, vip: 6, deep: 3 },
  { day: 'Wed', departure: 31, stayOver: 43, vip: 3, deep: 1 },
  { day: 'Thu', departure: 19, stayOver: 48, vip: 8, deep: 4 },
  { day: 'Fri', departure: 35, stayOver: 52, vip: 5, deep: 2 },
  { day: 'Sat', departure: 42, stayOver: 38, vip: 9, deep: 5 },
  { day: 'Sun', departure: 38, stayOver: 41, vip: 7, deep: 3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-xs">
      <p className="font-600 text-foreground mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={`tip-${entry.dataKey}`} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
          <span className="font-mono-data font-600 text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function WeeklyCleaningChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-600 text-foreground">Weekly Cleaning Volume</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Rooms cleaned by type this week</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs bg-muted border border-border rounded-lg px-2 py-1 text-muted-foreground outline-none">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gradDeparture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--status-vacant-dirty)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--status-vacant-dirty)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradStayOver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradVip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--status-inspected)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--status-inspected)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="stayOver" stroke="var(--primary)" strokeWidth={2} fill="url(#gradStayOver)" name="Stay Over" />
          <Area type="monotone" dataKey="departure" stroke="var(--status-vacant-dirty)" strokeWidth={2} fill="url(#gradDeparture)" name="Departure" />
          <Area type="monotone" dataKey="vip" stroke="var(--status-inspected)" strokeWidth={2} fill="url(#gradVip)" name="VIP" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        {[
          { key: 'stay-over-leg', label: 'Stay Over', color: 'var(--primary)' },
          { key: 'departure-leg', label: 'Departure', color: 'var(--status-vacant-dirty)' },
          { key: 'vip-leg', label: 'VIP', color: 'var(--status-inspected)' },
          { key: 'deep-leg', label: 'Deep Clean', color: 'var(--status-clean)' },
        ].map((item) => (
          <div key={item.key} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}