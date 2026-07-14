import React from 'react';
import AppLayout from '@/app/layout';
import SupervisorContent from './components/SupervisorContent';

export default function SupervisorDashboardPage() {
  return (
    <AppLayout currentPath="/supervisor-dashboard">
      <SupervisorContent />
    </AppLayout>
  );
}
