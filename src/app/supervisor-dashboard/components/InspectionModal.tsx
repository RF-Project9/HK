'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { CheckSquare, Square, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Room } from './RoomGrid';
import { toast } from 'sonner';

const inspectionChecklist = [
  { id: 'insp-bed', label: 'Bed made — linens tight, pillows aligned' },
  { id: 'insp-bath', label: 'Bathroom cleaned — toilet, sink, shower' },
  { id: 'insp-floor', label: 'Floor vacuumed and mopped' },
  { id: 'insp-dust', label: 'All surfaces dusted — furniture, ledges' },
  { id: 'insp-amenities', label: 'Amenities fully restocked' },
  { id: 'insp-linen', label: 'Linen replaced and counted correctly' },
  { id: 'insp-glass', label: 'Glass surfaces streak-free' },
  { id: 'insp-balcony', label: 'Balcony/terrace swept and tidy' },
  { id: 'insp-minibar', label: 'Minibar checked and restocked' },
  { id: 'insp-odor', label: 'No odors — fresh scent present' },
  { id: 'insp-damage', label: 'No damage to furniture or fixtures' },
  { id: 'insp-ac', label: 'AC set to standard temperature (22°C)' },
];

interface InspectionModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}

export default function InspectionModal({ open, onClose, room }: InspectionModalProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (checked.size === inspectionChecklist.length) {
      setChecked(new Set());
    } else {
      setChecked(new Set(inspectionChecklist.map(i => i.id)));
    }
  };

  const passRate = Math.round((checked.size / inspectionChecklist.length) * 100);

  const handleApprove = async () => {
    if (checked.size < inspectionChecklist.length) {
      toast.error(`Complete all ${inspectionChecklist.length} checklist items before approving`);
      return;
    }
    setSubmitting(true);
    // Backend integration point: POST /api/inspections { roomId, status: 'approved', comment, checklist }
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    toast.success(`Room ${room?.number} inspection approved — status set to Inspected`);
    setChecked(new Set());
    setComment('');
    onClose();
  };

  const handleReject = async () => {
    setSubmitting(true);
    // Backend integration point: POST /api/inspections { roomId, status: 'rejected', comment }
    await new Promise(r => setTimeout(r, 600));
    setSubmitting(false);
    toast.error(`Room ${room?.number} sent back for re-cleaning`);
    setChecked(new Set());
    setComment('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Inspect Room ${room?.number ?? ''}`} size="lg">
      <div className="p-5 space-y-5">
        {/* Room info */}
        {room && (
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div>
              <p className="text-xs text-muted-foreground">Room</p>
              <p className="text-lg font-bold font-mono-data text-primary">{room.number}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-600 text-foreground">{room.type}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-xs text-muted-foreground">Cleaned by</p>
              <p className="text-sm font-600 text-foreground">{room.attendant ?? '—'}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-xs text-muted-foreground">Pass rate</p>
              <p className={`text-lg font-bold font-mono-data ${passRate >= 100 ? 'text-green-400' : passRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                {passRate}%
              </p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">{checked.size} of {inspectionChecklist.length} items checked</span>
            <button onClick={toggleAll} className="text-xs text-primary hover:underline">
              {checked.size === inspectionChecklist.length ? 'Uncheck All' : 'Check All'}
            </button>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${passRate >= 100 ? 'bg-green-500' : passRate >= 70 ? 'bg-yellow-400' : 'bg-red-500'}`}
              style={{ width: `${passRate}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {inspectionChecklist.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-150 text-left
                  ${isChecked ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/50 border-border/50 hover:border-border'}`}
              >
                {isChecked
                  ? <CheckSquare size={16} className="text-green-400 flex-shrink-0" />
                  : <Square size={16} className="text-muted-foreground flex-shrink-0" />
                }
                <span className={`text-sm ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-600 text-muted-foreground uppercase tracking-wide mb-2">
            <MessageSquare size={12} className="inline mr-1" />
            Inspector Comments
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            placeholder="Note any issues, special observations, or follow-up actions…"
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 resize-none transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReject}
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-600 hover:bg-red-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <ThumbsDown size={15} />
            Reject — Re-clean
          </button>
          <button
            onClick={handleApprove}
            disabled={submitting || checked.size < inspectionChecklist.length}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-600 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <ThumbsUp size={15} />
            )}
            Approve — Inspected
          </button>
        </div>
      </div>
    </Modal>
  );
}