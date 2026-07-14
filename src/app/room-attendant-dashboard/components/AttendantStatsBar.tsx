import React from 'react';
import { Star } from 'lucide-react';

interface AttendantStatsBarProps {
  assigned: number;
  completed: number;
  inspected: number;
  avgMinutes: number;
}

export default function AttendantStatsBar({ assigned, completed, inspected, avgMinutes }: AttendantStatsBarProps) {
  const pct = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Attendant info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            MS
          </div>
          <div>
            <p className="text-sm font-600 text-foreground">Maria Santos</p>
            <p className="text-xs text-muted-foreground">Room Attendant · Morning Shift</p>
          </div>
        </div>

        <div className="w-px h-10 bg-border hidden sm:block" />

        {/* Stats */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-lg font-bold font-mono-data text-primary">{completed}/{assigned}</p>
            <p className="text-xs text-muted-foreground">Rooms Done</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-mono-data text-blue-400">{inspected}</p>
            <p className="text-xs text-muted-foreground">Inspected</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-mono-data text-green-400">{avgMinutes} min</p>
            <p className="text-xs text-muted-foreground">Avg Duration</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <Star size={14} className="text-primary fill-primary" />
              <p className="text-lg font-bold font-mono-data text-primary">4.8</p>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex-1 min-w-40">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Shift progress</span>
            <span className="text-xs font-mono-data text-foreground">{pct}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gold-gradient rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Shift time */}
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-muted-foreground">Shift</p>
          <p className="text-sm font-mono-data text-foreground">07:00 – 15:00</p>
          <p className="text-xs text-muted-foreground font-mono-data">5h 42m remaining</p>
        </div>
      </div>
    </div>
  );
}