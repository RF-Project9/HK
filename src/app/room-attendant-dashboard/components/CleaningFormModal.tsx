'use client';
import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import {
  Clock, CheckSquare, Square, Plus, Minus, Camera,
  Save, ChevronDown, AlertCircle, Shirt, Package,
} from 'lucide-react';
import { AssignedRoom } from './AssignedRoomCard';
import { toast } from 'sonner';

interface CleaningFormData {
  guestName: string;
  cleaningType: string;
  remark: string;
}

const checklistItems = [
  { id: 'chk-bed', label: 'Make Bed', icon: '🛏️' },
  { id: 'chk-vacuum', label: 'Vacuum Floor', icon: '🧹' },
  { id: 'chk-bathroom', label: 'Bathroom Cleaning', icon: '🚿' },
  { id: 'chk-dusting', label: 'Dusting', icon: '🪣' },
  { id: 'chk-amenities', label: 'Amenities Restock', icon: '🧴' },
  { id: 'chk-linen', label: 'Linen Replacement', icon: '🛁' },
  { id: 'chk-glass', label: 'Glass Cleaning', icon: '🪟' },
  { id: 'chk-balcony', label: 'Balcony / Terrace', icon: '🌿' },
  { id: 'chk-minibar', label: 'Minibar Check', icon: '🍷' },
  { id: 'chk-final', label: 'Final Inspection', icon: '✅' },
];

const linenItems = [
  { id: 'linen-bs', label: 'Bed Sheet', key: 'bedSheet' },
  { id: 'linen-pc', label: 'Pillow Case', key: 'pillowCase' },
  { id: 'linen-bt', label: 'Bath Towel', key: 'bathTowel' },
  { id: 'linen-ht', label: 'Hand Towel', key: 'handTowel' },
  { id: 'linen-bm', label: 'Bath Mat', key: 'bathMat' },
  { id: 'linen-ft', label: 'Face Towel', key: 'faceTowel' },
  { id: 'linen-dc', label: 'Duvet Cover', key: 'duvetCover' },
];

const amenityItems = [
  { id: 'amen-soap', label: 'Soap', key: 'soap' },
  { id: 'amen-shampoo', label: 'Shampoo', key: 'shampoo' },
  { id: 'amen-cond', label: 'Conditioner', key: 'conditioner' },
  { id: 'amen-dental', label: 'Dental Kit', key: 'dentalKit' },
  { id: 'amen-comb', label: 'Comb', key: 'comb' },
  { id: 'amen-sanitary', label: 'Sanitary Bag', key: 'sanitaryBag' },
  { id: 'amen-shower', label: 'Shower Cap', key: 'showerCap' },
  { id: 'amen-coffee', label: 'Coffee', key: 'coffee' },
  { id: 'amen-tea', label: 'Tea', key: 'tea' },
  { id: 'amen-sugar', label: 'Sugar', key: 'sugar' },
  { id: 'amen-creamer', label: 'Creamer', key: 'creamer' },
  { id: 'amen-water', label: 'Mineral Water', key: 'mineralWater' },
  { id: 'amen-lotion', label: 'Body Lotion', key: 'bodyLotion' },
];

const cleaningTypes = ['Stay Over', 'Departure', 'Vacant', 'VIP', 'Deep Cleaning'];

interface CleaningFormModalProps {
  open: boolean;
  onClose: () => void;
  room: AssignedRoom | null;
  onComplete: (roomId: string) => void;
}

export default function CleaningFormModal({ open, onClose, room, onComplete }: CleaningFormModalProps) {
  const [checklist, setChecklist] = useState<Set<string>>(new Set());
  const [linen, setLinen] = useState<Record<string, number>>(() =>
    Object.fromEntries(linenItems.map(i => [i.key, 0]))
  );
  const [amenities, setAmenities] = useState<Record<string, number>>(() =>
    Object.fromEntries(amenityItems.map(i => [i.key, 0]))
  );
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [beforePhotos, setBeforePhotos] = useState<string[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'checklist' | 'linen' | 'amenities' | 'photos'>('checklist');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CleaningFormData>({
    defaultValues: {
      guestName: room?.guestName ?? '',
      cleaningType: room?.cleaningType ?? 'Stay Over',
      remark: '',
    },
  });

  useEffect(() => {
    if (open && room) {
      reset({
        guestName: room.guestName ?? '',
        cleaningType: room.cleaningType ?? 'Stay Over',
        remark: '',
      });
      setChecklist(new Set());
      setLinen(Object.fromEntries(linenItems.map(i => [i.key, 0])));
      setAmenities(Object.fromEntries(amenityItems.map(i => [i.key, 0])));
      setElapsedSec(0);
      setTimerActive(true);
      setActiveSection('checklist');
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open, room, reset]);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setElapsedSec(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleCheck = (id: string) => {
    setChecklist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const adjustCount = (map: Record<string, number>, setter: React.Dispatch<React.SetStateAction<Record<string, number>>>, key: string, delta: number) => {
    setter(prev => ({ ...prev, [key]: Math.max(0, (prev[key] ?? 0) + delta) }));
  };

  const checklistPct = Math.round((checklist.size / checklistItems.length) * 100);

  const handlePhotoUpload = (type: 'before' | 'after') => {
    // Backend integration point: upload photo to /api/cleanings/photos
    const mockUrl = `https://placehold.co/200x150/1A1E2E/C9A84C?text=${type}+photo`;
    if (type === 'before') {
      setBeforePhotos(prev => [...prev, mockUrl]);
    } else {
      setAfterPhotos(prev => [...prev, mockUrl]);
    }
    toast.success(`${type === 'before' ? 'Before' : 'After'} photo uploaded`);
  };

  const onSubmit = async (data: CleaningFormData) => {
    if (checklist.size < checklistItems.length) {
      toast.error(`Complete all ${checklistItems.length} checklist items before saving`);
      return;
    }
    setSubmitting(true);
    setTimerActive(false);

    // Backend integration point: POST /api/room-cleanings
    // { roomId, guestName, cleaningType, checklist, linen, amenities, duration: elapsedSec, remark, photos }
    await new Promise(r => setTimeout(r, 1000));

    setSubmitting(false);
    toast.success(`Room ${room?.number} cleaning saved — supervisor notified`);
    onComplete(room?.id ?? '');
    onClose();
  };

  const sections = [
    { id: 'checklist', label: 'Checklist', count: `${checklist.size}/${checklistItems.length}` },
    { id: 'linen', label: 'Linen', count: `${Object.values(linen).reduce((a, b) => a + b, 0)} pcs` },
    { id: 'amenities', label: 'Amenities', count: `${Object.values(amenities).reduce((a, b) => a + b, 0)} pcs` },
    { id: 'photos', label: 'Photos', count: `${beforePhotos.length + afterPhotos.length}` },
  ] as const;

  return (
    <Modal open={open} onClose={onClose} title={`Cleaning Form — Room ${room?.number ?? ''}`} size="2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 space-y-5">
          {/* Timer + room info bar */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-xl font-bold font-mono-data text-primary">{formatTime(elapsedSec)}</p>
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground">Room</p>
              <p className="text-base font-bold font-mono-data text-foreground">{room?.number}</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-600 text-foreground">{room?.type}</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground">Checklist</p>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${checklistPct >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${checklistPct}%` }}
                  />
                </div>
                <span className="text-xs font-mono-data text-foreground">{checklistPct}%</span>
              </div>
            </div>
            <div className="ml-auto">
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                className={`text-xs px-3 py-1.5 rounded-lg font-500 transition-all ${timerActive ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' : 'bg-green-500/10 text-green-400 border border-green-500/30'}`}
              >
                {timerActive ? '⏸ Pause' : '▶ Resume'}
              </button>
            </div>
          </div>

          {/* Basic info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-600 text-muted-foreground uppercase tracking-wide mb-1.5">
                Guest Name <span className="text-muted-foreground font-400 normal-case">(optional)</span>
              </label>
              <input
                type="text"
                {...register('guestName')}
                placeholder="e.g. Michael Chen"
                className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-muted-foreground uppercase tracking-wide mb-1.5">
                Cleaning Type <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  {...register('cleaningType', { required: 'Cleaning type is required' })}
                  className="w-full appearance-none bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
                >
                  {cleaningTypes.map((ct) => (
                    <option key={`ct-${ct}`} value={ct}>{ct}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              {errors.cleaningType && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.cleaningType.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-600 text-muted-foreground uppercase tracking-wide mb-1.5">
                Status Room
              </label>
              <div className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm">
                <span className={`inline-flex items-center gap-1.5 text-xs font-500 ${
                  room?.status === 'cleaning' ? 'text-yellow-400' :
                  room?.status === 'vacant-dirty' ? 'text-red-400' : 'text-green-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    room?.status === 'cleaning' ? 'bg-yellow-400' :
                    room?.status === 'vacant-dirty' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  {room?.status?.replace('-', ' ') ?? '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Section tabs */}
          <div className="flex bg-muted rounded-lg p-1 gap-1">
            {sections.map((s) => (
              <button
                key={`sec-${s.id}`}
                type="button"
                onClick={() => setActiveSection(s.id as typeof activeSection)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-500 transition-all
                  ${activeSection === s.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <span>{s.label}</span>
                <span className={`text-xs font-mono-data px-1.5 py-0.5 rounded-full ${activeSection === s.id ? 'bg-primary/10 text-primary' : 'bg-muted-foreground/20'}`}>
                  {s.count}
                </span>
              </button>
            ))}
          </div>

          {/* Section content */}
          {activeSection === 'checklist' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{checklist.size} of {checklistItems.length} completed</span>
                <button
                  type="button"
                  onClick={() => {
                    if (checklist.size === checklistItems.length) {
                      setChecklist(new Set());
                    } else {
                      setChecklist(new Set(checklistItems.map(i => i.id)));
                    }
                  }}
                  className="text-xs text-primary hover:underline"
                >
                  {checklist.size === checklistItems.length ? 'Uncheck All' : 'Check All'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {checklistItems.map((item) => {
                  const isChecked = checklist.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-150 text-left
                        ${isChecked
                          ? 'bg-green-500/10 border-green-500/30' :'bg-muted/50 border-border/50 hover:border-border'
                        }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {isChecked
                        ? <CheckSquare size={16} className="text-green-400 flex-shrink-0" />
                        : <Square size={16} className="text-muted-foreground flex-shrink-0" />
                      }
                      <span className={`text-sm font-500 ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'linen' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shirt size={15} className="text-primary" />
                <span className="text-sm font-600 text-foreground">Linen Replacement</span>
                <span className="text-xs text-muted-foreground ml-auto">Total: {Object.values(linen).reduce((a, b) => a + b, 0)} pieces</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {linenItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => adjustCount(linen, setLinen, item.key, -1)}
                        className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors active:scale-95"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center font-mono-data text-sm font-600 text-foreground">{linen[item.key]}</span>
                      <button
                        type="button"
                        onClick={() => adjustCount(linen, setLinen, item.key, 1)}
                        className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors active:scale-95"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'amenities' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package size={15} className="text-primary" />
                <span className="text-sm font-600 text-foreground">Amenities Replenishment</span>
                <span className="text-xs text-muted-foreground ml-auto">Total: {Object.values(amenities).reduce((a, b) => a + b, 0)} pieces</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenityItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => adjustCount(amenities, setAmenities, item.key, -1)}
                        className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors active:scale-95"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center font-mono-data text-sm font-600 text-foreground">{amenities[item.key]}</span>
                      <button
                        type="button"
                        onClick={() => adjustCount(amenities, setAmenities, item.key, 1)}
                        className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors active:scale-95"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'photos' && (
            <div className="space-y-4">
              {/* Before photos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-600 text-foreground">Before Cleaning</span>
                  <button
                    type="button"
                    onClick={() => handlePhotoUpload('before')}
                    className="flex items-center gap-1.5 text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Camera size={13} />
                    Add Photo
                  </button>
                </div>
                {beforePhotos.length === 0 ? (
                  <div className="h-24 rounded-lg border border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Camera size={20} className="text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">No before photos yet</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {beforePhotos.map((url, idx) => (
                      <div key={`before-${idx + 1}`} className="w-20 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                        <img src={url} alt={`Before cleaning photo ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* After photos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-600 text-foreground">After Cleaning</span>
                  <button
                    type="button"
                    onClick={() => handlePhotoUpload('after')}
                    className="flex items-center gap-1.5 text-xs bg-muted border border-border rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Camera size={13} />
                    Add Photo
                  </button>
                </div>
                {afterPhotos.length === 0 ? (
                  <div className="h-24 rounded-lg border border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Camera size={20} className="text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">No after photos yet</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {afterPhotos.map((url, idx) => (
                      <div key={`after-${idx + 1}`} className="w-20 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                        <img src={url} alt={`After cleaning photo ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Remark */}
          <div>
            <label className="block text-xs font-600 text-muted-foreground uppercase tracking-wide mb-1.5">
              Remark / Notes
            </label>
            <textarea
              {...register('remark')}
              rows={2}
              placeholder="Any special observations, maintenance issues, guest requests…"
              className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 resize-none transition-colors"
            />
          </div>

          {/* Checklist warning */}
          {checklist.size < checklistItems.length && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle size={15} className="text-yellow-400 flex-shrink-0" />
              <p className="text-xs text-yellow-400">
                Complete all {checklistItems.length} checklist items before saving. {checklistItems.length - checklist.size} remaining.
              </p>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-card border-t border-border px-5 py-4 flex items-center gap-3">
          <div className="flex-1 text-xs text-muted-foreground">
            <span className="font-mono-data text-primary">{formatTime(elapsedSec)}</span>
            {' '}elapsed · {checklist.size}/{checklistItems.length} checklist
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-sm font-600 text-muted-foreground bg-muted border border-border hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-600 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Save size={15} />
                Save & Notify
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}