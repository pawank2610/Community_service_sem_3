"use client";

import React, { useState } from 'react';
import { X, HelpCircle, Send, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { addDoubt, getDoubts } from '@/lib/db';

interface DoubtResolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  studentClass: string;
  onSubmitted?: () => void;
}

export default function DoubtResolverModal({
  isOpen,
  onClose,
  studentId,
  studentName,
  studentClass,
  onSubmitted
}: DoubtResolverModalProps) {
  const [subject, setSubject] = useState<'Mathematics' | 'Science'>('Mathematics');
  const [topic, setTopic] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const existingDoubts = getDoubts(studentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !questionText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addDoubt({
        studentId,
        studentName,
        grade: studentClass,
        subject,
        topic,
        questionText,
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTopic('');
      setQuestionText('');

      setTimeout(() => {
        setSuccess(false);
        if (onSubmitted) onSubmitted();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl">
              <HelpCircle className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                INSTANT ACADEMIC DOUBT RESOLVER
              </span>
              <h3 className="font-black text-lg mt-0.5">Ask Praveen Sir & Rashmi Ma'am</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          
          {/* Ask New Doubt Form */}
          {success ? (
            <div className="p-6 text-center space-y-3 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white">Doubt Submitted Successfully!</h4>
              <p className="text-xs text-slate-300">
                Praveen Gandhi / Rashmi Anand will post the step-by-step resolution on your portal shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 text-xs">
              <h4 className="font-bold text-white text-sm flex items-center">
                <Send className="w-4 h-4 text-blue-400 mr-2" />
                Submit New Question or Doubt
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Mathematics">Mathematics (Praveen Sir)</option>
                    <option value="Science">Science (Rashmi Ma'am)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Chapter / Topic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quadratic Equations Ex 4.2"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Detailed Question *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste problem text, formula doubt, or step explanation requirement..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                {isSubmitting ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Doubt to Teacher Desk</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Previous Doubts History */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center">
              <MessageSquare className="w-4 h-4 text-purple-400 mr-2" />
              Your Question History & Solutions ({existingDoubts.length})
            </h4>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {existingDoubts.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-xl border border-slate-800">
                  No previous doubts asked. Submit a question above to get help!
                </div>
              ) : (
                existingDoubts.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-400">{d.subject} • {d.topic}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <p className="text-slate-200 font-medium">"{d.questionText}"</p>

                    {d.teacherReply && (
                      <div className="p-3 rounded-lg bg-indigo-950/50 border border-indigo-800/40 text-indigo-200 space-y-1">
                        <div className="font-bold text-xs text-indigo-300">
                          Teacher Reply ({d.repliedBy}):
                        </div>
                        <p className="text-[11px] leading-relaxed">{d.teacherReply}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
