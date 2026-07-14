'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,  } from 'recharts';

const laundryData = [
  { name: 'Delivered', value: 34, id: 'pie-del' },
  { name: 'In Progress', value: 12, id: 'pie-prog' },
  { name: 'Pending', value: 8, id: 'pie-pend' },
  { name: 'Overdue', value: 3, id: 'pie-over' },
];

const storeData = [
  { name: 'Fulfilled', value: 21, id: 'store-ful' },
  { name: 'Pending', value: 7, id: 'store-pend' },
  { name: 'Rejected', value: 2, id: 'store-rej' },
];

const laundryColors = ['#22C55E', '#C9A84C', '#3B82F6', '#EF4444'];
const storeColors = ['#3B82F6', '#EAB308', '#EF4444'];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-2.5 shadow-xl text-xs">
      <p className="font-600 text-foreground">{payload[0]?.name}</p>
      <p className="font-mono-data text-primary mt-0.5">{payload[0]?.value} orders</p>
    </div>
  );
};

export default function LaundryStoreChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <h3 className="text-sm font-600 text-foreground mb-1">Laundry & Store</h3>
      <p className="text-xs text-muted-foreground mb-4">Today's order status</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-500 text-muted-foreground text-center mb-2">Laundry</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={laundryData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                {laundryData.map((entry, index) => (
                  <Cell key={entry.id} fill={laundryColors[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-1">
            {laundryData.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: laundryColors[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono-data text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-500 text-muted-foreground text-center mb-2">Store Requests</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={storeData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                {storeData.map((entry, index) => (
                  <Cell key={entry.id} fill={storeColors[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-1">
            {storeData.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: storeColors[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono-data text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}