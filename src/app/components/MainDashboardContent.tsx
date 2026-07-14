'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import RoomStatusKPIGrid from './RoomStatusKPIGrid';
import CleaningProgressBar from './CleaningProgressBar';
import ActivityFeed from './ActivityFeed';
import FloorRoomMiniGrid from './FloorRoomMiniGrid';
import { RefreshCw, Download, Calendar } from 'lucide-react';

const WeeklyCleaningChart = dynamic(() => import('./WeeklyCleaningChart'), { ssr: false });
const ProductivityChart = dynamic(() => import('./ProductivityChart'), { ssr: false });
const LinenAmenitiesChart = dynamic(() => import('./LinenAmenitiesChart'), { ssr: false });
const LaundryStoreChart = dynamic(() => import('./LaundryStoreChart'), { ssr: false });

export default function MainDashboardContent() {
  const [lastUpdated] = useState('07/14/2026 09:42 AM');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Morning Shift · Mon Jul 14, 2026 ·
            <span className="font-mono-data ml-1">Last updated: {lastUpdated}</span>
            <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block ml-2" />
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <select className="text-xs bg-card border border-border rounded-lg px-3 py-2 text-muted-foreground outline-none hover:border-primary/40 transition-colors">
            <option>All Buildings</option>
            <option>Tower A</option>
            <option>Tower B</option>
          </select>
          <button className="flex items-center gap-2 text-xs bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <Calendar size={14} />
            Today
          </button>
          <button className="flex items-center gap-2 text-xs bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <Download size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-primary hover:bg-primary/20 transition-colors">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Grid — 6 cards */}
      <RoomStatusKPIGrid />

      {/* Charts + Activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyCleaningChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Progress + Productivity + Linen row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <CleaningProgressBar />
        </div>
        <div>
          <ProductivityChart />
        </div>
        <div>
          <LinenAmenitiesChart />
        </div>
      </div>

      {/* Floor overview + Laundry/Store */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <FloorRoomMiniGrid />
        </div>
        <div>
          <LaundryStoreChart />
        </div>
      </div>
    </div>
  );
}