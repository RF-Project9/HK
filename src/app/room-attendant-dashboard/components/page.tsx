import React from 'react';
// Ganti ../layout menjadi @/app/layout supaya berkas ditemukan dengan pasti
import AppLayout from '@/app/layout';
import RoomAttendantContent from './components/RoomAttendantContent';

export default function RoomAttendantDashboardPage() {
  return (
    <AppLayout currentPath="/room-attendant-dashboard">
      <RoomAttendantContent />
    </AppLayout>
  );
}
