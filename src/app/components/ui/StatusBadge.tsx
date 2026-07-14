import React from 'react';

type RoomStatus = 'vacant-dirty' | 'cleaning' | 'clean' | 'inspected' | 'out-of-order' | 'occupied';

interface StatusBadgeProps {
  status: RoomStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<RoomStatus, { label: string; className: string; dot: string }> = {
  'vacant-dirty': { label: 'Vacant Dirty', className: 'status-vacant-dirty', dot: 'bg-red-500' },
  'cleaning': { label: 'Cleaning', className: 'status-cleaning', dot: 'bg-yellow-400' },
  'clean': { label: 'Clean', className: 'status-clean', dot: 'bg-green-500' },
  'inspected': { label: 'Inspected', className: 'status-inspected', dot: 'bg-blue-500' },
  'out-of-order': { label: 'Out of Order', className: 'status-out-of-order', dot: 'bg-gray-500' },
  'occupied': { label: 'Occupied', className: 'status-occupied', dot: 'bg-purple-500' },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.className} ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}