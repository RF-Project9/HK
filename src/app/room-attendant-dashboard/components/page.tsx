import React from 'react';
import AppLayout from '@/components/AppLayout';
import RoomAttendantContent from './components/RoomAttendantContent';

export default function RoomAttendantDashboardPage() {
  return (
    <AppLayout currentPath="/room-attendant-dashboard">
      <RoomAttendantContent />
    </AppLayout>
  );
}