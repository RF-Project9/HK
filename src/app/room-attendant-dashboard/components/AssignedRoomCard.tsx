'use client';
import React from 'react';
import { Clock, Play, CheckCircle, Eye, MapPin, User } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

type RoomStatus = 'vacant-dirty' | 'cleaning' | 'clean' | 'inspected' | 'out-of-order' | 'occupied';

export interface AssignedRoom {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: RoomStatus;
  guestName: string | null;
  cleaningType: string;
  priority: boolean;
  estimatedMin: number;
  startedAt: string | null;
  completedAt: string | null;
  checklistPct: number;
}

interface AssignedRoomCardProps {
  room: AssignedRoom;
  onStartCleaning: (room: AssignedRoom) => void;
}

export default function AssignedRoomCard({ room, onStartCleaning }: AssignedRoomCardProps) {
  const isCompleted = room.status === 'clean' || room.status === 'inspected';
  const isCleaning = room.status === 'cleaning';

  return (
    <div className={`
      bg-card border rounded-xl p-4 card-hover transition-all
      ${room.priority ? 'border-primary/40 bg-primary/5' : 'border-border'}
      ${isCompleted ? 'opacity-70' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono-data text-primary">Room {room.number}</span>
            {room.priority && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/30 font-500">VIP</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Floor {room.floor} · {room.type}</span>
          </div>
        </div>
        <StatusBadge status={room.status} />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-24">Cleaning Type</span>
          <span className="text-xs font-500 text-foreground">{room.cleaningType}</span>
        </div>
        {room.guestName && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-24">Guest</span>
            <div className="flex items-center gap-1.5">
              <User size={11} className="text-muted-foreground" />
              <span className="text-xs font-500 text-foreground">{room.guestName}</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-24">Est. Duration</span>
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-muted-foreground" />
            <span className="text-xs font-mono-data text-foreground">{room.estimatedMin} min</span>
          </div>
        </div>
        {room.startedAt && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-24">Started</span>
            <span className="text-xs font-mono-data text-foreground">{room.startedAt}</span>
          </div>
        )}
        {room.completedAt && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-24">Completed</span>
            <span className="text-xs font-mono-data text-green-400">{room.completedAt}</span>
          </div>
        )}
      </div>

      {/* Checklist progress (if in progress) */}
      {isCleaning && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Checklist</span>
            <span className="text-xs font-mono-data text-foreground">{room.checklistPct}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${room.checklistPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Action button */}
      {isCompleted ? (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-500">
          <CheckCircle size={15} />
          {room.status === 'inspected' ? 'Inspected' : 'Cleaning Complete'}
        </div>
      ) : isCleaning ? (
        <button
          onClick={() => onStartCleaning(room)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-600 hover:bg-yellow-500/20 transition-all active:scale-95"
        >
          <Eye size={15} />
          Continue Cleaning
        </button>
      ) : (
        <button
          onClick={() => onStartCleaning(room)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-600 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Play size={15} />
          Start Cleaning
        </button>
      )}
    </div>
  );
}