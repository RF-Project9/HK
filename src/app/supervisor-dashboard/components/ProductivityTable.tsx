import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const attendants = [
  { id: 'ptbl-001', name: 'Maria Santos', avatar: 'MS', color: 'from-pink-500 to-rose-600', assigned: 8, completed: 6, inspected: 5, rejected: 1, avgMin: 38, passRate: 83, trend: 5 },
  { id: 'ptbl-002', name: 'John Reyes', avatar: 'JR', color: 'from-blue-500 to-indigo-600', assigned: 7, completed: 7, inspected: 7, rejected: 0, avgMin: 42, passRate: 100, trend: 12 },
  { id: 'ptbl-003', name: 'Ana Cruz', avatar: 'AC', color: 'from-emerald-500 to-green-600', assigned: 9, completed: 4, inspected: 3, rejected: 1, avgMin: 35, passRate: 75, trend: -8 },
  { id: 'ptbl-004', name: 'Pedro Lim', avatar: 'PL', color: 'from-amber-500 to-orange-600', assigned: 6, completed: 5, inspected: 5, rejected: 0, avgMin: 44, passRate: 100, trend: 0 },
  { id: 'ptbl-005', name: 'Luz Ramos', avatar: 'LR', color: 'from-violet-500 to-purple-600', assigned: 8, completed: 3, inspected: 2, rejected: 1, avgMin: 39, passRate: 67, trend: -15 },
];

export default function ProductivityTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-600 text-foreground">Attendant Productivity</h3>
        <span className="text-xs text-muted-foreground font-mono-data">Morning shift · Jul 14, 2026</span>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['Attendant', 'Assigned', 'Completed', 'Inspected', 'Rejected', 'Avg Duration', 'Pass Rate', 'Trend']?.map((h) => (
                <th key={`th-${h}`} className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendants?.map((att) => {
              const TrendIcon = att?.trend > 0 ? TrendingUp : att?.trend < 0 ? TrendingDown : Minus;
              return (
                <tr key={att?.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${att?.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {att?.avatar}
                      </div>
                      <span className="font-500 text-foreground whitespace-nowrap">{att?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono-data text-muted-foreground">{att?.assigned}</td>
                  <td className="px-4 py-3 font-mono-data text-foreground font-600">{att?.completed}</td>
                  <td className="px-4 py-3 font-mono-data text-blue-400">{att?.inspected}</td>
                  <td className="px-4 py-3 font-mono-data">
                    <span className={att?.rejected > 0 ? 'text-red-400' : 'text-muted-foreground'}>{att?.rejected}</span>
                  </td>
                  <td className="px-4 py-3 font-mono-data text-muted-foreground">{att?.avgMin} min</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${att?.passRate >= 90 ? 'bg-green-500' : att?.passRate >= 70 ? 'bg-yellow-400' : 'bg-red-500'}`}
                          style={{ width: `${att?.passRate}%` }}
                        />
                      </div>
                      <span className={`font-mono-data text-xs ${att?.passRate >= 90 ? 'text-green-400' : att?.passRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {att?.passRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 text-xs font-mono-data ${att?.trend > 0 ? 'text-green-400' : att?.trend < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                      <TrendIcon size={13} />
                      <span>{att?.trend > 0 ? '+' : ''}{att?.trend}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}