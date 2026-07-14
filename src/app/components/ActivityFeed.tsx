import React from 'react';
import { CheckCircle, Brush, Eye, Package, Shirt, Search, AlertTriangle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  { id: 'act-001', type: 'clean', icon: CheckCircle, color: 'text-green-400 bg-green-500/10', message: 'Room 412 marked Clean', actor: 'Maria Santos', time: '2 min ago' },
  { id: 'act-002', type: 'inspect', icon: Eye, color: 'text-blue-400 bg-blue-500/10', message: 'Room 308 Inspected & approved', actor: 'Sarah Kim', time: '5 min ago' },
  { id: 'act-003', type: 'cleaning', icon: Brush, color: 'text-yellow-400 bg-yellow-500/10', message: 'Room 215 cleaning started', actor: 'Ana Cruz', time: '9 min ago' },
  { id: 'act-004', type: 'laundry', icon: Shirt, color: 'text-purple-400 bg-purple-500/10', message: 'Laundry #L-0892 delivered to R.501', actor: 'Order Taker', time: '14 min ago' },
  { id: 'act-005', type: 'store', icon: Package, color: 'text-orange-400 bg-orange-500/10', message: 'Store request SR-0234 fulfilled', actor: 'Warehouse', time: '18 min ago' },
  { id: 'act-006', type: 'alert', icon: AlertTriangle, color: 'text-red-400 bg-red-500/10', message: 'Room 118 overdue — no update 2h', actor: 'System', time: '22 min ago' },
  { id: 'act-007', type: 'found', icon: Search, color: 'text-cyan-400 bg-cyan-500/10', message: 'Lost & Found: Gold watch, Floor 4', actor: 'Pedro Lim', time: '28 min ago' },
  { id: 'act-008', type: 'clean', icon: CheckCircle, color: 'text-green-400 bg-green-500/10', message: 'Room 601 marked Clean', actor: 'Luz Ramos', time: '35 min ago' },
];

export default function ActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-600 text-foreground">Live Activity</h3>
        <span className="flex items-center gap-1.5 text-xs text-green-400">
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
          Real-time
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto scrollbar-thin max-h-72">
        {activities?.map((act) => {
          const Icon = act?.icon;
          return (
            <div key={act?.id} className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${act?.color}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{act?.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{act?.actor}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground font-mono-data">{act?.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <button className="text-xs text-primary hover:underline w-full text-center">View full activity log</button>
      </div>
    </div>
  );
}