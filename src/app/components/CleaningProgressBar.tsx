import React from 'react';
import { Users, Clock } from 'lucide-react';

const attendants = [
  { id: 'att-001', name: 'Maria Santos', rooms: 8, completed: 6, avatar: 'MS', color: 'from-pink-500 to-rose-600' },
  { id: 'att-002', name: 'John Reyes', rooms: 7, completed: 7, avatar: 'JR', color: 'from-blue-500 to-indigo-600' },
  { id: 'att-003', name: 'Ana Cruz', rooms: 9, completed: 4, avatar: 'AC', color: 'from-emerald-500 to-green-600' },
  { id: 'att-004', name: 'Pedro Lim', rooms: 6, completed: 5, avatar: 'PL', color: 'from-amber-500 to-orange-600' },
  { id: 'att-005', name: 'Luz Ramos', rooms: 8, completed: 3, avatar: 'LR', color: 'from-violet-500 to-purple-600' },
];

export default function CleaningProgressBar() {
  const totalRooms = attendants?.reduce((s, a) => s + a?.rooms, 0);
  const totalDone = attendants?.reduce((s, a) => s + a?.completed, 0);
  const overallPct = Math.round((totalDone / totalRooms) * 100);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-600 text-foreground">Cleaning Progress</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Morning shift · 07:00–15:00</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-mono-data text-primary">{overallPct}%</p>
          <p className="text-xs text-muted-foreground font-mono-data">{totalDone}/{totalRooms} rooms</p>
        </div>
      </div>
      {/* Overall progress */}
      <div className="h-2.5 bg-muted rounded-full mb-5 overflow-hidden">
        <div
          className="h-full gold-gradient rounded-full transition-all duration-500"
          style={{ width: `${overallPct}%` }}
        />
      </div>
      {/* Per-attendant */}
      <div className="space-y-3">
        {attendants?.map((att) => {
          const pct = Math.round((att?.completed / att?.rooms) * 100);
          return (
            <div key={att?.id} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${att?.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {att?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-500 text-foreground truncate">{att?.name}</span>
                  <span className="text-xs font-mono-data text-muted-foreground ml-2 flex-shrink-0">{att?.completed}/{att?.rooms}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${att?.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-mono-data text-muted-foreground w-8 text-right flex-shrink-0">{pct}%</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users size={13} />
          <span>{attendants?.length} active attendants</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} />
          <span className="font-mono-data">Est. completion 12:45</span>
        </div>
      </div>
    </div>
  );
}