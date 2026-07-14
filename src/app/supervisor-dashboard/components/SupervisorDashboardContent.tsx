'use client';
import React, { useState, useMemo } from 'react';
import RoomGrid, { Room } from './RoomGrid';
import AssignmentPanel from './AssignmentPanel';
import InspectionModal from './InspectionModal';
import ProductivityTable from './ProductivityTable';

import { Filter, RefreshCw, BarChart3, Grid3X3 } from 'lucide-react';

type RoomStatus = 'vacant-dirty' | 'cleaning' | 'clean' | 'inspected' | 'out-of-order' | 'occupied';

// Backend integration point: fetch from /api/rooms?floor=X
const generateRooms = (): Room[] => {
  const types = ['Standard King', 'Standard Twin', 'Deluxe King', 'Suite', 'Junior Suite'];
  const guests = [null, 'Michael Chen', null, 'Amanda Foster', 'Robert Kim', null, 'Elena Vasquez', null];
  const attendants = [null, 'Maria Santos', 'John Reyes', 'Ana Cruz', 'Pedro Lim', 'Luz Ramos'];
  const statuses: RoomStatus[] = ['occupied', 'occupied', 'vacant-dirty', 'cleaning', 'clean', 'inspected', 'out-of-order', 'occupied'];

  const rooms: Room[] = [];
  for (let floor = 1; floor <= 6; floor++) {
    const count = floor <= 4 ? 14 : floor === 5 ? 10 : 8;
    for (let r = 1; r <= count; r++) {
      const idx = (floor * 7 + r) % statuses.length;
      const status = statuses[idx];
      rooms.push({
        id: `room-${floor}${String(r).padStart(2, '0')}`,
        number: `${floor}${String(r).padStart(2, '0')}`,
        floor,
        type: types[(floor + r) % types.length],
        status,
        attendant: status === 'cleaning' || status === 'clean' ? attendants[(r) % attendants.length] : null,
        startTime: status === 'cleaning' ? '09:15 AM' : null,
        duration: status === 'cleaning' ? 15 + (r % 30) : null,
        priority: r % 7 === 0,
        guestName: guests[(floor + r) % guests.length],
      });
    }
  }
  return rooms;
};

const allRooms = generateRooms();

const floors = [0, 1, 2, 3, 4, 5, 6];
const statusFilters: { value: RoomStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'vacant-dirty', label: 'Vacant Dirty' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'clean', label: 'Clean' },
  { value: 'inspected', label: 'Inspected' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'out-of-order', label: 'Out of Order' },
];

const statusCount = (rooms: Room[], status: RoomStatus) => rooms.filter(r => r.status === status).length;

export default function SupervisorDashboardContent() {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'all'>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>(allRooms);
  const [inspectRoom, setInspectRoom] = useState<Room | null>(null);
  const [inspectOpen, setInspectOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    let r = rooms;
    if (selectedFloor !== 0) r = r.filter(room => room.floor === selectedFloor);
    if (statusFilter !== 'all') r = r.filter(room => room.status === statusFilter);
    return r;
  }, [rooms, selectedFloor, statusFilter]);

  const handleAssign = (room: Room, attendantId: string) => {
    const attNames: Record<string, string> = {
      'att-001': 'Maria Santos', 'att-002': 'John Reyes', 'att-003': 'Ana Cruz',
      'att-004': 'Pedro Lim', 'att-005': 'Luz Ramos',
    };
    setRooms(prev => prev.map(r =>
      r.id === room.id ? { ...r, status: 'cleaning', attendant: attNames[attendantId], startTime: '09:42 AM', duration: 0 } : r
    ));
    setSelectedRoom(null);
  };

  const handleInspect = (room: Room) => {
    setInspectRoom(room);
    setInspectOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Supervisor Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Room assignment & inspection · Morning Shift</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-xs bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <Filter size={14} />
            Filters
          </button>
          <button className="flex items-center gap-2 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-primary hover:bg-primary/20 transition-colors">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* Quick status summary */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {([
          { id: 'sum-vd', status: 'vacant-dirty' as RoomStatus, color: 'border-red-500/30 bg-red-500/5', text: 'text-red-400' },
          { id: 'sum-cl', status: 'cleaning' as RoomStatus, color: 'border-yellow-500/30 bg-yellow-500/5', text: 'text-yellow-400' },
          { id: 'sum-cn', status: 'clean' as RoomStatus, color: 'border-green-500/30 bg-green-500/5', text: 'text-green-400' },
          { id: 'sum-in', status: 'inspected' as RoomStatus, color: 'border-blue-500/30 bg-blue-500/5', text: 'text-blue-400' },
          { id: 'sum-oc', status: 'occupied' as RoomStatus, color: 'border-purple-500/30 bg-purple-500/5', text: 'text-purple-400' },
          { id: 'sum-oo', status: 'out-of-order' as RoomStatus, color: 'border-gray-500/30 bg-gray-500/5', text: 'text-gray-400' },
        ]).map((s) => (
          <button
            key={s.id}
            onClick={() => setStatusFilter(statusFilter === s.status ? 'all' : s.status)}
            className={`p-3 rounded-lg border transition-all ${s.color} ${statusFilter === s.status ? 'ring-2 ring-primary/50' : ''}`}
          >
            <p className={`text-xl font-bold font-mono-data ${s.text}`}>{statusCount(rooms, s.status)}</p>
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">{s.status.replace('-', ' ')}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Room grid panel */}
        <div className="xl:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          {/* Floor tabs */}
          <div className="flex items-center gap-0 border-b border-border overflow-x-auto scrollbar-thin">
            {floors.map((f) => (
              <button
                key={`floor-tab-${f}`}
                onClick={() => setSelectedFloor(f)}
                className={`px-4 py-3 text-sm font-500 whitespace-nowrap transition-colors border-b-2 flex-shrink-0
                  ${selectedFloor === f
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
              >
                {f === 0 ? 'All Floors' : `Floor ${f}`}
              </button>
            ))}
          </div>

          {/* Status filter chips */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border overflow-x-auto scrollbar-thin">
            {statusFilters.map((sf) => (
              <button
                key={`sf-${sf.value}`}
                onClick={() => setStatusFilter(sf.value)}
                className={`px-3 py-1 rounded-full text-xs font-500 whitespace-nowrap transition-all flex-shrink-0
                  ${statusFilter === sf.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
              >
                {sf.label}
                {sf.value !== 'all' && (
                  <span className="ml-1.5 font-mono-data">
                    ({statusCount(filteredRooms.length < rooms.length ? rooms : rooms, sf.value as RoomStatus)})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-mono-data">
                Showing {filteredRooms.length} of {rooms.length} rooms
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md bg-primary/10 text-primary">
                  <Grid3X3 size={14} />
                </button>
                <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors">
                  <BarChart3 size={14} />
                </button>
              </div>
            </div>
            <RoomGrid
              rooms={filteredRooms}
              selectedRoom={selectedRoom}
              onSelectRoom={setSelectedRoom}
            />
          </div>

          {/* Legend */}
          <div className="px-4 pb-4 flex flex-wrap gap-3">
            {[
              { id: 'leg-occ', label: 'Occupied', color: 'bg-purple-500' },
              { id: 'leg-vd', label: 'Vacant Dirty', color: 'bg-red-500' },
              { id: 'leg-cln', label: 'Cleaning', color: 'bg-yellow-400' },
              { id: 'leg-cle', label: 'Clean', color: 'bg-green-500' },
              { id: 'leg-ins', label: 'Inspected', color: 'bg-blue-500' },
              { id: 'leg-oo', label: 'Out of Order', color: 'bg-gray-500' },
            ].map((l) => (
              <div key={l.id} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm flex-shrink-0 ${l.color}`} />
                <span className="text-xs text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment panel */}
        <div className="xl:col-span-1">
          <AssignmentPanel
            selectedRoom={selectedRoom}
            onAssign={handleAssign}
            onInspect={handleInspect}
          />
        </div>
      </div>

      {/* Productivity table */}
      <ProductivityTable />

      {/* Inspection modal */}
      <InspectionModal
        open={inspectOpen}
        onClose={() => setInspectOpen(false)}
        room={inspectRoom}
      />
    </div>
  );
}