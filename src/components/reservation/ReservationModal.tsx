'use client';

import React, { useState, useEffect } from 'react';
import { DateUtils } from '@/utils/dateUtils';
import { PRICING_PER_GUEST_JOD, SEATING_SLOTS } from '../../../tests/helpers/contracts.mjs';

export interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fridayDate: string;
  timeSlot: string;
  guestCount: number;
  fullName: string;
  email: string;
  phone: string;
  dietaryNotes: string;
}

interface FormErrors {
  fridayDate?: string;
  timeSlot?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const upcomingFridays = DateUtils.getUpcomingFridays(6);
  const defaultFriday = upcomingFridays[0]
    ? upcomingFridays[0].toISOString().split('T')[0]
    : '';

  const [formState, setFormState] = useState<FormState>({
    fridayDate: defaultFriday,
    timeSlot: 'afternoon',
    guestCount: 2,
    fullName: '',
    email: '',
    phone: '',
    dietaryNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Friday date
    const dateValidation = DateUtils.validateFridayDate(formState.fridayDate);
    if (!dateValidation.valid) {
      newErrors.fridayDate = dateValidation.error;
    }

    // Validate Time Slot
    if (!formState.timeSlot) {
      newErrors.timeSlot = 'Please select a dining service time slot.';
    }

    // Validate Name
    if (!formState.fullName.trim() || formState.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full legal name.';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim() || !emailRegex.test(formState.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Validate Phone
    const phoneClean = formState.phone.replace(/[\s-]/g, '');
    if (!phoneClean || phoneClean.length < 8) {
      newErrors.phone = 'Please provide a valid contact telephone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setVoucherCode(`JO-FRI-${randomId}`);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const selectedSlotObj = SEATING_SLOTS.find((s) => s.id === formState.timeSlot) || SEATING_SLOTS[0];
  const totalPriceJod = formState.guestCount * PRICING_PER_GUEST_JOD;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B192C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B192C] border border-[#C5A880]/40 shadow-2xl p-6 sm:p-8 text-[#F5F0E8] z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close reservation modal"
          className="absolute top-6 right-6 p-2 rounded-full text-[#F5F0E8]/60 hover:text-[#C5A880] hover:bg-[#1B2A4A] transition-colors"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Private Friday Salon Seating
              </span>
              <h2 id="reservation-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                Reserve Your Friday Table
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F0E8]/70 font-light">
                Our hearth operates strictly on Fridays for an intimate group of sixteen guests.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Strict Friday Date Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-2">
                  1. Select Upcoming Friday (Exclusive Service Day) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {upcomingFridays.map((friDate) => {
                    const iso = friDate.toISOString().split('T')[0];
                    const isSelected = formState.fridayDate === iso;
                    const dateFormatted = DateUtils.formatFridayDate(friDate);
                    return (
                      <button
                        type="button"
                        key={iso}
                        onClick={() => {
                          setFormState({ ...formState, fridayDate: iso });
                          if (errors.fridayDate) setErrors({ ...errors, fridayDate: undefined });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#1B2A4A] border-[#C5A880] shadow-md ring-1 ring-[#C5A880]'
                            : 'bg-[#1B2A4A]/30 border-[#1B2A4A] hover:border-[#C5A880]/40 text-[#F5F0E8]/80'
                        }`}
                      >
                        <span className="block font-bold text-xs text-[#FDFBF7]">
                          {dateFormatted.split(',')[1]}
                        </span>
                        <span className="text-[10px] font-mono text-[#C5A880]">
                          Every Friday
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.fridayDate && (
                  <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.fridayDate}</p>
                )}
              </div>

              {/* 2. Seating Time Slot */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-2">
                  2. Dining Atmosphere &amp; Time Slot *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SEATING_SLOTS.map((slot) => {
                    const isSelected = formState.timeSlot === slot.id;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setFormState({ ...formState, timeSlot: slot.id })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1B2A4A] border-[#C5A880] ring-1 ring-[#C5A880]'
                            : 'bg-[#1B2A4A]/30 border-[#1B2A4A] hover:border-[#C5A880]/40'
                        }`}
                      >
                        <div>
                          <span className="font-serif text-sm font-bold text-[#FDFBF7] block">
                            {slot.time}
                          </span>
                          <span className="text-xs text-[#C5A880] font-medium block mt-0.5">
                            {slot.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#F5F0E8]/60 mt-2 font-light leading-snug">
                          {slot.atmosphere}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Guest Stepper */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                    3. Guest Party Size (Max 8 per reservation) *
                  </label>
                  <span className="text-xs font-serif text-[#FDFBF7]">
                    {PRICING_PER_GUEST_JOD} JOD / guest tasting
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-xl bg-[#1B2A4A]/40 border border-[#1B2A4A]">
                  <button
                    type="button"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        guestCount: Math.max(1, formState.guestCount - 1),
                      })
                    }
                    className="w-10 h-10 rounded-lg bg-[#1B2A4A] hover:bg-[#C5A880] hover:text-[#0B192C] font-bold text-lg transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="flex-grow text-center">
                    <span className="font-serif text-2xl font-bold text-[#FDFBF7]">
                      {formState.guestCount} {formState.guestCount === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <span className="block text-[11px] text-[#C5A880] font-mono">
                      Estimated Total: {totalPriceJod} JOD
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormState({
                        ...formState,
                        guestCount: Math.min(8, formState.guestCount + 1),
                      })
                    }
                    className="w-10 h-10 rounded-lg bg-[#1B2A4A] hover:bg-[#C5A880] hover:text-[#0B192C] font-bold text-lg transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                {formState.guestCount >= 8 && (
                  <p className="mt-2 text-xs text-[#C5A880] italic">
                    Note: For private salon full buyouts (9 to 16 guests), Chef Tariq arranges dedicated private cellar services.
                  </p>
                )}
              </div>

              {/* 4. Guest Details */}
              <div className="space-y-4 pt-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                  4. Guest Contact &amp; Dietary Requirements
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#F5F0E8]/70 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder="e.g. Zaid Al-Majali"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A] text-sm text-[#FDFBF7] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C5A880]"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#F5F0E8]/70 mb-1">
                      Email Address (Confirmation Voucher) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. zaid@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A] text-sm text-[#FDFBF7] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C5A880]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#F5F0E8]/70 mb-1">
                    Telephone (WhatsApp Contact for Directions) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+962 7 9000 0000"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A] text-sm text-[#FDFBF7] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C5A880]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#F5F0E8]/70 mb-1">
                    Dietary Restrictions, Allergies or Sourcing Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={formState.dietaryNotes}
                    onChange={(e) => setFormState({ ...formState, dietaryNotes: e.target.value })}
                    placeholder="e.g., strictly gluten-free for 1 guest, no pine nuts, celebrating anniversary"
                    className="w-full px-4 py-2 rounded-lg bg-[#1B2A4A]/50 border border-[#1B2A4A] text-sm text-[#FDFBF7] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1B2A4A]">
                <span className="text-xs text-[#F5F0E8]/60">
                  Payment is settled hearthside upon conclusion of the tasting.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm bg-[#C5A880] text-[#0B192C] hover:bg-[#FDFBF7] transition-all shadow-lg active:scale-95"
                >
                  Confirm Friday Reservation
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Voucher Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#3E4D34]/30 border border-[#A3B899] flex items-center justify-center text-2xl text-[#A3B899]">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#FDFBF7]">
                We Await You Friday, {formState.fullName}
              </h2>
              <p className="text-sm text-[#F5F0E8]/75 max-w-md mx-auto font-light">
                Chef Tariq has registered your party in this week’s exclusive hearth register.
              </p>
            </div>

            {/* Simulated Digital Voucher */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#1B2A4A]/60 border border-[#C5A880]/50 text-left space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#1B2A4A] pb-3">
                <span className="text-xs font-mono uppercase text-[#C5A880]">
                  Voucher Reference
                </span>
                <span className="font-mono text-sm font-bold text-[#FDFBF7] tracking-wider">
                  #{voucherCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#F5F0E8]/60 block font-mono">Date</span>
                  <span className="font-serif text-sm font-bold text-[#FDFBF7]">
                    {DateUtils.formatFridayDate(new Date(formState.fridayDate + 'T00:00:00Z'))}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F0E8]/60 block font-mono">Seating Slot</span>
                  <span className="font-serif text-sm font-bold text-[#FDFBF7]">
                    {selectedSlotObj.time} ({selectedSlotObj.title})
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F0E8]/60 block font-mono">Party</span>
                  <span className="font-serif text-sm font-bold text-[#FDFBF7]">
                    {formState.guestCount} Guests ({totalPriceJod} JOD)
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F0E8]/60 block font-mono">Guest</span>
                  <span className="font-serif text-sm font-bold text-[#FDFBF7]">
                    {formState.fullName}
                  </span>
                </div>
              </div>

              {formState.dietaryNotes && (
                <div className="border-t border-[#1B2A4A] pt-3 text-xs">
                  <span className="text-[#F5F0E8]/60 block font-mono mb-1">
                    Dietary Notes Registered:
                  </span>
                  <p className="text-[#F5F0E8]/90 italic">{formState.dietaryNotes}</p>
                </div>
              )}
            </div>

            <p className="text-xs text-[#F5F0E8]/60 max-w-sm mx-auto">
              A copy has been dispatched to <strong>{formState.email}</strong>. Directions to our private Ajloun foothills dining salon will arrive via WhatsApp morning of service.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg font-semibold text-xs bg-[#C5A880] text-[#0B192C] hover:bg-[#FDFBF7] transition-all shadow-md active:scale-95"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
