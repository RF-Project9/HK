import React from 'react';
// ✅ Menunjuk tepat ke layout utama
import AppLayout from '@/app/layout';
// ✅ Sesuaikan nama berkas dengan yang ada di folder components
// Jika nama berkasnya SupervisorContent.tsx → pakai ini:
import SupervisorContent from './components/SupervisorContent';
// Jika nama berkasnya SupervisorDashboardContent.tsx → pakai ini:
// import SupervisorContent from './components/SupervisorDashboardContent';

export default function SupervisorDashboardPage() {
  return (
    <AppLayout currentPath="/supervisor-dashboard">
      <SupervisorContent />
    </AppLayout>
  );
}
