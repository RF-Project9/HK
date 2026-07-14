'use client';
import React from 'react';
import { Clock, User, Eye, AlertCircle } from 'lucide-react';

type RoomStatus = 'vacant-dirty' | 'cleaning' | 'clean' | 'inspected' | 'out-of-order' | 'occupied';

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: RoomStatus;
  attendant: string | null;
  startTime: string | null;
  duration: number | null;
  priority: boolean;
  guestName: string | null;
}

interface RoomGridProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
}

const statusConfig: Record<RoomStatus, { bg: string; border: string; label: string; text: string }> = {
  'vacant-dirty': { bg: 'bg-red-500/20', border: 'border-red-500/50', label: 'VD', text: 'text-red-300' },
  'cleaning': { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', label: 'CL', text: 'text-yellow-300' },
  'clean': { bg: 'bg-green-500/20', border: 'border-green-500/50', label: 'C', text: 'text-green-300' },
  'inspected': { bg: 'bg-blue-500/20', border: 'border-blue-500/50', label: 'I', text: 'text-blue-300' },
  'out-of-order': { bg: 'bg-gray-500/20', border: 'border-gray-500/50', label: 'OO', text: 'text-gray-400' },
  'occupied': { bg: 'bg-purple-500/20', border: 'border-purple-500/50', label: 'OCC', text: 'text-purple-300' },
};

export default function RoomGrid({ rooms, selectedRoom, onSelectRoom }: RoomGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2">
      {rooms.map((room) => {
        const cfg = statusConfig[room.status];
        const isSelected = selectedRoom?.id === room.id;
        return (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={`
              relative rounded-lg border p-2 text-left transition-all duration-150
              ${cfg.bg} ${cfg.border}
              ${isSelected ? 'ring-2 ring-primary scale-105 z-10' : 'hover:scale-105 hover:z-10'}
              ${room.priority ? 'ring-1 ring-primary/40' : ''}
            `}
          >
            <div className={`text-xs font-bold font-mono-data ${cfg.text}`}>{room.number}</div>
            <div className={`text-xs font-500 mt-0.5 ${cfg.text} opacity-80`}>{cfg.label}</div>
            {room.attendant && (
              <div className="mt-1 flex items-center gap-0.5">
                <User size={9} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate" style={{ fontSize: '9px' }}>
                  {room.attendant.split(' ')[0]}
                </span>
              </div>
            )}
            {room.status === 'cleaning' && room.duration != null && (
              <div className="mt-0.5 flex items-center gap-0.5">
                <Clock size={9} className="text-yellow-400 flex-shrink-0" />
                <span className="font-mono-data" style={{ fontSize: '9px', color: 'var(--status-cleaning)' }}>{room.duration}m</span>
              </div>
            )}
            {room.status === 'clean' && (
              <div className="absolute top-1 right-1">
                <Eye size={10} className="text-green-400" />
              </div>
            )}
            {room.priority && (
              <div className="absolute top-1 right-1">
                <AlertCircle size={9} className="text-primary" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}