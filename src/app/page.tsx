import React from 'react';
import AppLayout from '@/components/AppLayout';
import MainDashboardContent from './components/MainDashboardContent';

export default function MainDashboardPage() {
  return (
    <AppLayout currentPath="/">
      <MainDashboardContent />
    </AppLayout>
  );
}