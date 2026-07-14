'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { LayoutDashboard, ClipboardList, BedDouble, Users, ShoppingCart, Search, BookOpen, BarChart3, Settings, LogOut, Bell, Package, Shirt,  } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  currentPath: string;
}

const navGroups = [
  {
    label: 'Operations',
    items: [
      { href: '/', label: 'Main Dashboard', icon: LayoutDashboard, badge: null },
      { href: '/supervisor-dashboard', label: 'Supervisor', icon: ClipboardList, badge: '3' },
      { href: '/room-attendant-dashboard', label: 'Room Attendant', icon: BedDouble, badge: '12' },
    ],
  },
  {
    label: 'Services',
    items: [
      { href: '/order-taker', label: 'Order Taker', icon: ShoppingCart, badge: '5' },
      { href: '/laundry', label: 'Laundry', icon: Shirt, badge: null },
      { href: '/store-requests', label: 'Store Requests', icon: Package, badge: '2' },
      { href: '/lost-found', label: 'Lost & Found', icon: Search, badge: null },
      { href: '/log-book', label: 'Log Book', icon: BookOpen, badge: null },
    ],
  },
  {
    label: 'Management',
    items: [
      { href: '/reports', label: 'Reports', icon: BarChart3, badge: null },
      { href: '/users', label: 'Users', icon: Users, badge: null },
      { href: '/notifications', label: 'Notifications', icon: Bell, badge: '7' },
      { href: '/settings', label: 'Settings', icon: Settings, badge: null },
    ],
  },
];

export default function Sidebar({ collapsed, mobileOpen, onMobileClose, currentPath }: SidebarProps) {
  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col flex-shrink-0 h-screen bg-card border-r border-border
          transition-all duration-300 ease-in-out overflow-hidden
          ${collapsed ? 'w-16' : 'w-60'}
        `}
      >
        <SidebarContent collapsed={collapsed} isActive={isActive} />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col w-60 bg-card border-r border-border
          lg:hidden transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent collapsed={false} isActive={isActive} onMobileClose={onMobileClose} />
      </aside>
    </>
  );
}

function SidebarContent({
  collapsed,
  isActive,
  onMobileClose,
}: {
  collapsed: boolean;
  isActive: (href: string) => boolean;
  onMobileClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-base text-foreground tracking-tight">HKManager</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`} className="mb-4">
            {!collapsed && (
              <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground px-3 mb-2">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={`nav-${item.href}`}
                  href={item.href}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5
                    transition-all duration-150 group relative
                    ${active
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs font-600 bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-mono-data">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className={`border-t border-border p-3 flex-shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <button className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
            SK
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
              SK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-600 text-foreground truncate">Sarah Kim</p>
              <p className="text-xs text-muted-foreground truncate">Supervisor</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}