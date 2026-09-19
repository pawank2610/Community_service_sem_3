'use client';

import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MapPin, Sparkles, Filter, 
  CheckCircle2, Plus, Bell, Share2, BookOpen
} from 'lucide-react';
import { AcademicEvent, AcademicEventType } from '@/lib/types';
import { db, addAcademicEvent } from '@/lib/db';
import { getWhatsAppLink } from '@/lib/constants';

interface AcademicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTeacherMode?: boolean;
}

export default function AcademicCalendarModal({
  isOpen,
  onClose,
  isTeacherMode = false,
}: AcademicCalendarModalProps) {
  const [events, setEvents] = useState<AcademicEvent[]>(() => db.getAcademicEvents());
  const [filterType, setFilterType] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const settings = db.getSettings();

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '4:00 PM - 6:00 PM',
    eventType: 'TEST' as AcademicEventType,
    description: '',
    targetGrade: 'Class 10',
    venue: 'Room 101, Sec-22B Center',
  });

  if (!isOpen) return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    const created = addAcademicEvent(newEvent);
    setEvents(db.getAcademicEvents());
    setShowAddForm(false);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '4:00 PM - 6:00 PM',
      eventType: 'TEST',
      description: '',
      targetGrade: 'Class 10',
      venue: 'Room 101, Sec-22B Center',
    });
  };

  const filteredEvents = events.filter(e => {
    if (filterType === 'All') return true;
    return e.eventType === filterType;
  });

  const getEventBadge = (type: AcademicEventType) => {
    switch (type) {
      case 'TEST':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'WORKSHOP':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PTM':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'BOARD_PRACTICAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'HOLIDAY':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-prime-orange text-white flex items-center justify-center font-black shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-prime-orange bg-prime-orange/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Academic Roadmap
                </span>
                <span className="text-xs text-slate-300">Session 2026 - 2027</span>
              </div>
              <h2 className="text-lg font-black text-white mt-0.5">
                Institute Calendar & Test Schedule
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Top Filter & Add Event Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 mr-1 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1" /> Category:
              </span>
              {['All', 'TEST', 'WORKSHOP', 'PTM', 'BOARD_PRACTICAL', 'HOLIDAY'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    filterType === type 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {type === 'BOARD_PRACTICAL' ? 'Practicals' : type}
                </button>
              ))}
            </div>

            {isTeacherMode && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-prime-orange hover:bg-prime-orange-hover transition flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel' : 'Add Event'}</span>
              </button>
            )}
          </div>

          {/* Add Event Form (For Teachers / Admins) */}
          {showAddForm && (
            <form onSubmit={handleCreateEvent} className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-4 animate-fadeIn">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">
                Schedule New Academic Event
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 10 Pre-Board Assessment Test"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Type</label>
                  <select
                    value={newEvent.eventType}
                    onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="TEST">Mock Test / Assessment</option>
                    <option value="WORKSHOP">Sunday Doubt Marathon</option>
                    <option value="PTM">Parent-Teacher Meeting</option>
                    <option value="BOARD_PRACTICAL">Science Practical Demo</option>
                    <option value="HOLIDAY">Holiday Closure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Timings</label>
                  <input
                    type="text"
                    placeholder="e.g. 4:00 PM - 6:30 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Description / Syllabus</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details about syllabus coverage and student preparation guidelines..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Publish Event to Calendar
              </button>
            </form>
          )}

          {/* Events List */}
          <div className="space-y-3">
            {filteredEvents.map(evt => {
              const dateObj = new Date(evt.date);
              const day = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
              const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
              const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

              const reminderMsg = `Reminder for Prime Learning Event:\n📅 ${evt.title}\n🗓 Date: ${evt.date} (${evt.time || 'Scheduled Time'})\n📍 Venue: ${evt.venue || '948 Sec-22B Gurgaon'}\n${evt.description}`;
              const reminderWaUrl = getWhatsAppLink(settings.whatsappNumber, reminderMsg);

              return (
                <div 
                  key={evt.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4"
                >
                  {/* Date Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                    <span className="text-[10px] uppercase font-bold text-prime-orange">{month}</span>
                    <span className="text-xl font-black leading-none">{day}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">{weekday}</span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getEventBadge(evt.eventType)}`}>
                        {evt.eventType.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Target: {evt.targetGrade}
                      </span>
                      {evt.time && (
                        <span className="text-[10px] text-slate-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-slate-400" />
                          {evt.time}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {evt.description}
                    </p>

                    {evt.venue && (
                      <div className="text-[11px] text-slate-500 flex items-center pt-1">
                        <MapPin className="w-3 h-3 mr-1 text-prime-orange shrink-0" />
                        <span>{evt.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Reminder Button */}
                  <div className="self-end sm:self-center shrink-0">
                    <a
                      href={reminderWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200 flex items-center space-x-1 text-xs font-semibold"
                      title="Share Event on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                No events scheduled under this filter category.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Venue: 948, Sec-22B, Near Anand Farm, Gurugram
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
