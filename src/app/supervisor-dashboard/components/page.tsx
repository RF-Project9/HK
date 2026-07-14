import React from 'react';
import AppLayout from '@/components/AppLayout';
import SupervisorDashboardContent from './components/SupervisorDashboardContent';

export default function SupervisorDashboardPage() {
  return (
    <AppLayout currentPath="/supervisor-dashboard">
      <SupervisorDashboardContent />
    </AppLayout>
  );
}