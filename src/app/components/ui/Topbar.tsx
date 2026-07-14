'use client';
import React, { useState } from 'react';
import { Menu, PanelLeftClose, PanelLeft, Bell, Search, ChevronDown, Wifi } from 'lucide-react';

interface TopbarProps {
  onMenuToggle: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

export default function Topbar({ onMenuToggle, onSidebarToggle, sidebarCollapsed }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 'notif-1', type: 'clean', message: 'Room 412 cleaning completed', time: '2 min ago', read: false },
    { id: 'notif-2', type: 'laundry', message: 'Laundry order #L-0892 delivered', time: '8 min ago', read: false },
    { id: 'notif-3', type: 'store', message: 'Store request SR-0234 approved', time: '15 min ago', read: false },
    { id: 'notif-4', type: 'found', message: 'New Lost & Found item: Gold watch', time: '22 min ago', read: true },
    { id: 'notif-5', type: 'inspect', message: 'Room 308 ready for inspection', time: '31 min ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-3 flex-shrink-0 z-30">
      {/* Mobile menu */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar toggle */}
      <button
        onClick={onSidebarToggle}
        className="hidden lg:flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {sidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 border border-border">
        <Search size={15} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search rooms, attendants…"
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
        />
        <kbd className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </div>

      <div className="flex-1" />

      {/* Connectivity indicator */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-400">
        <Wifi size={14} />
        <span>Live</span>
        <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
      </div>

      {/* Shift indicator */}
      <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 border border-border">
        <span className="text-xs text-muted-foreground">Shift</span>
        <span className="text-xs font-600 text-primary">Morning</span>
        <span className="text-xs text-muted-foreground font-mono-data">07:00–15:00</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full text-xs font-bold text-primary-foreground flex items-center justify-center font-mono-data">
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 slide-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-600 text-foreground">Notifications</span>
              <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
            </div>
            <div className="max-h-72 overflow-y-auto scrollbar-thin">
              {notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                  <p className="text-sm text-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono-data">{n.time}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-center">
              <span className="text-xs text-primary cursor-pointer hover:underline">View all notifications</span>
            </div>
          </div>
        )}
      </div>

      {/* User menu */}
      <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
        <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
          SK
        </div>
        <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
      </button>
    </header>
  );
}