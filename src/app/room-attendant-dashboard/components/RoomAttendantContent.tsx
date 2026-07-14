'use client';
import React, { useState } from 'react';
import AssignedRoomCard, { AssignedRoom } from './AssignedRoomCard';
import CleaningFormModal from './CleaningFormModal';
import AttendantStatsBar from './AttendantStatsBar';
import { BedDouble, Search } from 'lucide-react';

// Backend integration point: fetch from /api/room-assignments?attendantId=current
const initialRooms: AssignedRoom[] = [
  { id: 'room-101', number: '101', floor: 1, type: 'Standard King', status: 'vacant-dirty', guestName: null, cleaningType: 'Departure', priority: false, estimatedMin: 35, startedAt: null, completedAt: null, checklistPct: 0 },
  { id: 'room-204', number: '204', floor: 2, type: 'Deluxe King', status: 'cleaning', guestName: 'Michael Chen', cleaningType: 'Stay Over', priority: false, estimatedMin: 40, startedAt: '08:15 AM', completedAt: null, checklistPct: 60 },
  { id: 'room-312', number: '312', floor: 3, type: 'Suite', status: 'vacant-dirty', guestName: null, cleaningType: 'VIP', priority: true, estimatedMin: 55, startedAt: null, completedAt: null, checklistPct: 0 },
  { id: 'room-115', number: '115', floor: 1, type: 'Standard Twin', status: 'clean', guestName: 'Amanda Foster', cleaningType: 'Stay Over', priority: false, estimatedMin: 30, startedAt: '07:10 AM', completedAt: '07:48 AM', checklistPct: 100 },
  { id: 'room-220', number: '220', floor: 2, type: 'Junior Suite', status: 'inspected', guestName: null, cleaningType: 'Departure', priority: false, estimatedMin: 45, startedAt: '07:50 AM', completedAt: '08:38 AM', checklistPct: 100 },
  { id: 'room-408', number: '408', floor: 4, type: 'Deluxe Twin', status: 'vacant-dirty', guestName: 'Elena Vasquez', cleaningType: 'Deep Cleaning', priority: false, estimatedMin: 65, startedAt: null, completedAt: null, checklistPct: 0 },
  { id: 'room-305', number: '305', floor: 3, type: 'Standard King', status: 'vacant-dirty', guestName: null, cleaningType: 'Departure', priority: false, estimatedMin: 35, startedAt: null, completedAt: null, checklistPct: 0 },
  { id: 'room-118', number: '118', floor: 1, type: 'Standard Twin', status: 'vacant-dirty', guestName: null, cleaningType: 'Vacant', priority: false, estimatedMin: 28, startedAt: null, completedAt: null, checklistPct: 0 },
];

const filterOptions = [
  { id: 'filter-all', label: 'All Rooms', value: 'all' },
  { id: 'filter-pending', label: 'Pending', value: 'pending' },
  { id: 'filter-cleaning', label: 'In Progress', value: 'cleaning' },
  { id: 'filter-done', label: 'Completed', value: 'done' },
];

export default function RoomAttendantContent() {
  const [rooms, setRooms] = useState<AssignedRoom[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<AssignedRoom | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [filterTab, setFilterTab] = useState('all');
  const [search, setSearch] = useState('');

  const handleStartCleaning = (room: AssignedRoom) => {
    setSelectedRoom(room);
    // Mark as cleaning if not already
    if (room.status === 'vacant-dirty') {
      setRooms(prev => prev.map(r =>
        r.id === room.id ? { ...r, status: 'cleaning', startedAt: '09:42 AM', checklistPct: 0 } : r
      ));
    }
    setFormOpen(true);
  };

  const handleComplete = (roomId: string) => {
    setRooms(prev => prev.map(r =>
      r.id === roomId ? { ...r, status: 'clean', completedAt: '10:24 AM', checklistPct: 100 } : r
    ));
  };

  const filteredRooms = rooms.filter(room => {
    const matchSearch = room.number.includes(search) || room.type.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab === 'pending') return room.status === 'vacant-dirty';
    if (filterTab === 'cleaning') return room.status === 'cleaning';
    if (filterTab === 'done') return room.status === 'clean' || room.status === 'inspected';
    return true;
  });

  const completedCount = rooms.filter(r => r.status === 'clean' || r.status === 'inspected').length;
  const inspectedCount = rooms.filter(r => r.status === 'inspected').length;
  const pendingCount = rooms.filter(r => r.status === 'vacant-dirty').length;
  const inProgressCount = rooms.filter(r => r.status === 'cleaning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Assigned Rooms</h1>
          <p className="text-sm text-muted-foreground mt-1">Morning Shift · Mon Jul 14, 2026</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-mono-data">{pendingCount} pending</span>
          <span className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono-data">{inProgressCount} in progress</span>
          <span className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-mono-data">{completedCount} done</span>
        </div>
      </div>

      {/* Stats bar */}
      <AttendantStatsBar
        assigned={rooms.length}
        completed={completedCount}
        inspected={inspectedCount}
        avgMinutes={38}
      />

      {/* Filters + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterTab(opt.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-500 transition-all whitespace-nowrap
                ${filterTab === opt.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 border border-border flex-1 max-w-xs">
          <Search size={14} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search room number or type…"
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>
      </div>

      {/* Room cards grid */}
      {filteredRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <BedDouble size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-base font-600 text-foreground mb-2">No rooms in this filter</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {filterTab === 'pending' ? 'All assigned rooms have been started or completed.' :
             filterTab === 'cleaning' ? 'No rooms are currently being cleaned.' :
             filterTab === 'done' ? 'No rooms have been completed yet this shift.' :
             'No rooms match your search.'}
          </p>
          {filterTab !== 'all' && (
            <button
              onClick={() => setFilterTab('all')}
              className="mt-4 text-sm text-primary hover:underline"
            >
              View all rooms
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <AssignedRoomCard
              key={room.id}
              room={room}
              onStartCleaning={handleStartCleaning}
            />
          ))}
        </div>
      )}

      {/* Cleaning form modal */}
      <CleaningFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        room={selectedRoom}
        onComplete={handleComplete}
      />
    </div>
  );
}