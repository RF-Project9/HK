'use client';
import React, { useState } from 'react';

type RoomStatus = 'vacant-dirty' | 'cleaning' | 'clean' | 'inspected' | 'out-of-order' | 'occupied';

interface Room {
  id: string;
  number: string;
  status: RoomStatus;
  floor: number;
}

const statusColors: Record<RoomStatus, string> = {
  'vacant-dirty': 'bg-red-500',
  'cleaning': 'bg-yellow-400',
  'clean': 'bg-green-500',
  'inspected': 'bg-blue-500',
  'out-of-order': 'bg-gray-500',
  'occupied': 'bg-purple-500',
};

// Backend integration point: fetch rooms from /api/rooms
const generateFloorRooms = (floor: number, count: number): Room[] => {
  const statuses: RoomStatus[] = ['occupied', 'occupied', 'occupied', 'vacant-dirty', 'cleaning', 'clean', 'inspected', 'out-of-order'];
  return Array.from({ length: count }, (_, i) => ({
    id: `room-${floor}${String(i + 1).padStart(2, '0')}`,
    number: `${floor}${String(i + 1).padStart(2, '0')}`,
    status: statuses[(floor * 3 + i) % statuses.length],
    floor,
  }));
};

const floors = [
  { id: 'floor-1', num: 1, rooms: generateFloorRooms(1, 14) },
  { id: 'floor-2', num: 2, rooms: generateFloorRooms(2, 14) },
  { id: 'floor-3', num: 3, rooms: generateFloorRooms(3, 14) },
  { id: 'floor-4', num: 4, rooms: generateFloorRooms(4, 12) },
  { id: 'floor-5', num: 5, rooms: generateFloorRooms(5, 10) },
  { id: 'floor-6', num: 6, rooms: generateFloorRooms(6, 8) },
];

const legend = [
  { id: 'leg-occupied', label: 'Occupied', color: 'bg-purple-500' },
  { id: 'leg-vd', label: 'Vacant Dirty', color: 'bg-red-500' },
  { id: 'leg-cleaning', label: 'Cleaning', color: 'bg-yellow-400' },
  { id: 'leg-clean', label: 'Clean', color: 'bg-green-500' },
  { id: 'leg-inspected', label: 'Inspected', color: 'bg-blue-500' },
  { id: 'leg-oor', label: 'Out of Order', color: 'bg-gray-500' },
];

export default function FloorRoomMiniGrid() {
  const [tooltip, setTooltip] = useState<{ room: Room; x: number; y: number } | null>(null);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-600 text-foreground">Floor Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">All 140 rooms · live status</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {legend.map((l) => (
            <div key={l.id} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${l.color}`} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 relative">
        {floors.map((floor) => (
          <div key={floor.id} className="flex items-center gap-3">
            <span className="text-xs font-mono-data text-muted-foreground w-12 flex-shrink-0">Fl. {floor.num}</span>
            <div className="flex flex-wrap gap-1.5">
              {floor.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`w-8 h-7 rounded room-cell ${statusColors[room.status]} opacity-80 hover:opacity-100 flex items-center justify-center`}
                  onMouseEnter={(e) => {
                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                    setTooltip({ room, x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  title={`Room ${room.number} — ${room.status.replace('-', ' ')}`}
                >
                  <span className="text-xs font-mono-data font-bold text-white/90">{room.number.slice(-2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}