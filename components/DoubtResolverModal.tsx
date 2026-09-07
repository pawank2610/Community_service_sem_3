"use client";

import React, { useState } from 'react';
import { X, HelpCircle, Send, CheckCircle2, Clock, MessageSquare, Sparkles, Bot, Lightbulb, ChevronDown } from 'lucide-react';
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

  // AI Instant Assistant state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const existingDoubts = getDoubts(studentId);

  const handleGenerateAIHint = async () => {
    if (!questionText.trim() && !topic.trim()) {
      alert('Please enter a topic or question to get an AI hint.');
      return;
    }

    setAiLoading(true);
    setAiResponse(null);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_google_gemini_api_key') {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert CBSE/ICSE teacher at Prime Learning Classes for ${studentClass}. Provide a concise step-by-step hint, key formulas, and common pitfalls for this question in ${subject} (${topic}): "${questionText}". Keep the response under 120 words.`
              }]
            }]
          })
        });
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setAiResponse(text);
          setAiLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Gemini API call fallback to local tutor model', e);
      }
    }

    // Smart curriculum-aligned heuristic solver fallback
    setTimeout(() => {
      let hint = '';
      const qLower = (topic + ' ' + questionText).toLowerCase();
      if (subject === 'Mathematics') {
        if (qLower.includes('quadratic') || qLower.includes('roots') || qLower.includes('discriminant')) {
          hint = `📐 Core Formula: Standard form ax² + bx + c = 0.\n• Discriminant D = b² - 4ac.\n• If D > 0: Two distinct real roots.\n• If D = 0: Two equal real roots (-b / 2a).\n• If D < 0: No real roots (imaginary roots).\n💡 Step: Compute b² - 4ac first before applying quadratic formula: x = (-b ± √D) / (2a).`;
        } else if (qLower.includes('trigo') || qLower.includes('sin') || qLower.includes('cos') || qLower.includes('tan')) {
          hint = `📐 Core Concept: Trigonometric Identities.\n• sin²θ + cos²θ = 1\n• 1 + tan²θ = sec²θ\n• 1 + cot²θ = cosec²θ\n💡 Step: Convert everything to sinθ and cosθ, then simplify terms using common LCM.`;
        } else if (qLower.includes('ap') || qLower.includes('arithmetic')) {
          hint = `📐 Core Formula: Arithmetic Progression.\n• nth term: aₙ = a + (n - 1)d\n• Sum of n terms: Sₙ = (n/2)[2a + (n - 1)d]\n💡 Tip: Express the given conditions as a system of two linear equations in 'a' and 'd'.`;
        } else {
          hint = `📐 Step-by-Step Approach for ${topic || 'Problem'}:\n1. Write down given values with units and identify what needs to be determined.\n2. State the governing theorem or algebraic identity.\n3. Evaluate calculations step-by-step. Praveen Sir will provide the official teacher review!`;
        }
      } else {
        if (qLower.includes('light') || qLower.includes('mirror') || qLower.includes('lens') || qLower.includes('focal')) {
          hint = `🔬 Physics Law: Mirror / Lens Formula & Sign Convention.\n• Mirror Formula: 1/f = 1/v + 1/u (m = -v/u)\n• Lens Formula: 1/f = 1/v - 1/u (m = v/u)\n• Sign Rule: Object distance (u) is always negative.\n💡 Tip: Always sketch a quick ray diagram to verify image orientation.`;
        } else if (qLower.includes('current') || qLower.includes('ohm') || qLower.includes('resistance')) {
          hint = `⚡ Physics Law: Ohm's Law V = I × R.\n• Series: R_eq = R₁ + R₂ + ... (Current remains constant).\n• Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (Voltage across branches is identical).\n💡 Tip: Simplify parallel resistor pairs first.`;
        } else if (qLower.includes('reaction') || qLower.includes('acid') || qLower.includes('base') || qLower.includes('metal')) {
          hint = `🧪 Chemistry Concept: Reactivity Series & Conservation of Mass.\n• Metal + Acid → Salt + Hydrogen Gas (H₂).\n• Neutralization: Acid + Base → Salt + Water.\n💡 Tip: Verify all elements are balanced on both reactant and product sides.`;
        } else {
          hint = `🔬 Science Concept Breakdown for ${topic || 'Question'}:\n1. Identify the scientific principle or chemical reaction involved.\n2. Write down relevant SI units and definitions.\n3. Rashmi Ma'am will review your detailed explanation and post faculty solution.`;
        }
      }
      setAiResponse(hint);
      setAiLoading(false);
    }, 600);
  };

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
      setAiResponse(null);

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
                24/7 AI-POWERED & FACULTY DOUBT DESK
              </span>
              <h3 className="font-black text-lg mt-0.5">Instant Hint & Faculty Doubt Resolution</h3>
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
                Praveen Gandhi / Rashmi Anand will review and post the verified step-by-step resolution to your portal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm flex items-center">
                  <Send className="w-4 h-4 text-blue-400 mr-2" />
                  Ask Question or Get Instant Hint
                </h4>
                <span className="text-[10px] text-slate-400">Class: {studentClass}</span>
              </div>

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
                  placeholder="Paste problem statement, formula doubt, or specific step confusion..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Instant AI Hint Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleGenerateAIHint}
                  disabled={aiLoading}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 transition"
                >
                  {aiLoading ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>⚡ Instant AI Hint & Formulas</span>
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 transition"
                >
                  {isSubmitting ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit to Teacher Desk</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Response Card */}
              {aiResponse && (
                <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-700/60 text-indigo-100 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>Prime Learning AI Tutor Hint:</span>
                  </div>
                  <pre className="text-[11px] whitespace-pre-wrap font-sans leading-relaxed text-indigo-100">
                    {aiResponse}
                  </pre>
                  <p className="text-[10px] text-indigo-300 italic pt-1 border-t border-indigo-800/50">
                    Need full personalized correction? Click "Submit to Teacher Desk" above.
                  </p>
                </div>
              )}
            </form>
          )}

          {/* Previous Doubts History */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center">
              <MessageSquare className="w-4 h-4 text-purple-400 mr-2" />
              Your Question History & Solutions ({existingDoubts.length})
            </h4>

            <div className="space-y-3 max-h-56 overflow-y-auto">
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
