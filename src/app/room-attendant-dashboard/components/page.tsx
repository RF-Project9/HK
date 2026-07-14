import React from 'react';
// ✅ Menunjuk tepat ke layout.tsx yang sudah ada
import AppLayout from '@/app/layout';
// ✅ Sesuai lokasi berkas yang ada
import RoomAttendantContent from './components/RoomAttendantContent';

export default function RoomAttendantDashboardPage() {
  return (
    <AppLayout currentPath="/room-attendant-dashboard">
      <RoomAttendantContent />
    </AppLayout>
  );
}
