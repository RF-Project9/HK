import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { BedDouble, Wind, Brush, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

const kpiData = [
  {
    id: 'kpi-occupied',
    label: 'Occupied',
    value: 87,
    subValue: 'of 140 rooms',
    icon: BedDouble,
    color: 'purple' as const,
    trend: { value: 3, label: 'vs yesterday 84' },
  },
  {
    id: 'kpi-vacant-dirty',
    label: 'Vacant Dirty',
    value: 18,
    subValue: '6 overdue >2h',
    icon: AlertTriangle,
    color: 'red' as const,
    alert: true,
    trend: { value: -5, label: 'vs yesterday 19' },
  },
  {
    id: 'kpi-cleaning',
    label: 'Cleaning',
    value: 12,
    subValue: 'in progress now',
    icon: Brush,
    color: 'yellow' as const,
    trend: { value: 0, label: 'same as yesterday' },
  },
  {
    id: 'kpi-clean',
    label: 'Clean',
    value: 9,
    subValue: 'awaiting inspection',
    icon: CheckCircle,
    color: 'green' as const,
    trend: { value: 12, label: 'vs yesterday 8' },
  },
  {
    id: 'kpi-inspected',
    label: 'Inspected',
    value: 11,
    subValue: 'ready for guests',
    icon: ShieldCheck,
    color: 'blue' as const,
    trend: { value: 10, label: 'vs yesterday 10' },
  },
  {
    id: 'kpi-oor',
    label: 'Out of Order',
    value: 3,
    subValue: 'maintenance active',
    icon: Wind,
    color: 'gray' as const,
    trend: { value: 0, label: 'no change' },
  },
];

export default function RoomStatusKPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((kpi) => (
        <MetricCard
          key={kpi.id}
          label={kpi.label}
          value={kpi.value}
          subValue={kpi.subValue}
          icon={kpi.icon}
          color={kpi.color}
          alert={kpi.alert}
          trend={kpi.trend}
        />
      ))}
    </div>
  );
}