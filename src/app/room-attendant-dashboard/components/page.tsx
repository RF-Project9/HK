import React from 'react';
import AppLayout from '../layout';
import RoomAttendantContent from './components/RoomAttendantContent';

export default function RoomAttendantDashboardPage() {
  return (
    <AppLayout currentPath="/room-attendant-dashboard">
      <RoomAttendantContent />
    </AppLayout>
  );
}
