'use client';
import React, { useState } from 'react';
import { UserCheck, ChevronDown } from 'lucide-react';
import { Room } from './RoomGrid';
import { toast } from 'sonner';

interface Attendant {
  id: string;
  name: string;
  avatar: string;
  color: string;
  assigned: number;
  completed: number;
  status: 'active' | 'break' | 'offline';
}

const attendants: Attendant[] = [
  { id: 'att-001', name: 'Maria Santos', avatar: 'MS', color: 'from-pink-500 to-rose-600', assigned: 8, completed: 6, status: 'active' },
  { id: 'att-002', name: 'John Reyes', avatar: 'JR', color: 'from-blue-500 to-indigo-600', assigned: 7, completed: 7, status: 'active' },
  { id: 'att-003', name: 'Ana Cruz', avatar: 'AC', color: 'from-emerald-500 to-green-600', assigned: 9, completed: 4, status: 'active' },
  { id: 'att-004', name: 'Pedro Lim', avatar: 'PL', color: 'from-amber-500 to-orange-600', assigned: 6, completed: 5, status: 'break' },
  { id: 'att-005', name: 'Luz Ramos', avatar: 'LR', color: 'from-violet-500 to-purple-600', assigned: 8, completed: 3, status: 'active' },
];

const statusDot: Record<string, string> = {
  active: 'bg-green-400',
  break: 'bg-yellow-400',
  offline: 'bg-gray-500',
};

interface AssignmentPanelProps {
  selectedRoom: Room | null;
  onAssign: (room: Room, attendantId: string) => void;
  onInspect: (room: Room) => void;
}

export default function AssignmentPanel({ selectedRoom, onAssign, onInspect }: AssignmentPanelProps) {
  const [selectedAttendant, setSelectedAttendant] = useState<string>('');
  const [ddOpen, setDdOpen] = useState(false);

  const handleAssign = () => {
    if (!selectedRoom || !selectedAttendant) {
      toast.error('Select a room and attendant first');
      return;
    }
    onAssign(selectedRoom, selectedAttendant);
    const att = attendants.find(a => a.id === selectedAttendant);
    toast.success(`Room ${selectedRoom.number} assigned to ${att?.name}`);
    setSelectedAttendant('');
  };

  const selectedAtt = attendants.find(a => a.id === selectedAttendant);

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-5">
      {/* Attendant list */}
      <div>
        <h3 className="text-sm font-600 text-foreground mb-3 flex items-center gap-2">
          <UserCheck size={15} className="text-primary" />
          Room Attendants
        </h3>
        <div className="space-y-2">
          {attendants.map((att) => {
            const pct = Math.round((att.completed / att.assigned) * 100);
            return (
              <div key={att.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border/50">
                <div className="relative flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${att.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {att.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${statusDot[att.status]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-600 text-foreground truncate">{att.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${att.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono-data text-muted-foreground flex-shrink-0">{att.completed}/{att.assigned}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-500 ${att.status === 'active' ? 'bg-green-500/10 text-green-400' : att.status === 'break' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-500/10 text-gray-400'}`}>
                  {att.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignment form */}
      <div className="border-t border-border pt-4">
        <h4 className="text-xs font-600 text-muted-foreground uppercase tracking-wide mb-3">Assign Room</h4>

        {/* Selected room */}
        <div className="mb-3 p-3 rounded-lg bg-muted/50 border border-border/50">
          {selectedRoom ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-mono-data text-primary">Room {selectedRoom.number}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-500 ${
                  selectedRoom.status === 'vacant-dirty' ? 'status-vacant-dirty' :
                  selectedRoom.status === 'cleaning' ? 'status-cleaning' :
                  selectedRoom.status === 'clean' ? 'status-clean' : 'status-inspected'
                }`}>
                  {selectedRoom.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{selectedRoom.type} · Floor {selectedRoom.floor}</p>
              {selectedRoom.guestName && <p className="text-xs text-muted-foreground">Guest: {selectedRoom.guestName}</p>}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-1">Click a room to select</p>
          )}
        </div>

        {/* Attendant dropdown */}
        <div className="relative mb-3">
          <button
            onClick={() => setDdOpen(!ddOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-muted border border-border rounded-lg text-sm text-left transition-colors hover:border-primary/40"
          >
            {selectedAtt ? (
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${selectedAtt.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {selectedAtt.avatar}
                </div>
                <span className="text-foreground text-sm">{selectedAtt.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">Select attendant…</span>
            )}
            <ChevronDown size={15} className={`text-muted-foreground transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
          </button>
          {ddOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden slide-up">
              {attendants.filter(a => a.status !== 'offline').map((att) => (
                <button
                  key={att.id}
                  onClick={() => { setSelectedAttendant(att.id); setDdOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors text-left"
                >
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${att.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                    {att.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{att.name}</p>
                    <p className="text-xs text-muted-foreground font-mono-data">{att.assigned - att.completed} rooms remaining</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot[att.status]}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAssign}
          disabled={!selectedRoom || !selectedAttendant}
          className="w-full py-2.5 rounded-lg text-sm font-600 transition-all duration-150 active:scale-95
            bg-primary text-primary-foreground hover:bg-primary/90
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Assign Room
        </button>

        {selectedRoom?.status === 'clean' && (
          <button
            onClick={() => selectedRoom && onInspect(selectedRoom)}
            className="w-full mt-2 py-2.5 rounded-lg text-sm font-600 transition-all duration-150 active:scale-95 bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
          >
            Start Inspection
          </button>
        )}
      </div>
    </div>
  );
}