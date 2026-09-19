'use client';

import React, { useState } from 'react';
import { 
  X, Sparkles, RotateCw, ChevronLeft, ChevronRight, 
  CheckCircle2, AlertCircle, BookOpen, Layers, Award, Lightbulb
} from 'lucide-react';
import { FormulaFlashcard } from '@/lib/types';
import { db } from '@/lib/db';

interface FormulaFlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export default function FormulaFlashcardsModal({
  isOpen,
  onClose,
  initialSubject = 'All',
}: FormulaFlashcardsModalProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());

  const allCards = db.getFlashcards();
  const filteredCards = allCards.filter(c => {
    if (selectedSubject === 'All') return true;
    return c.subject.toLowerCase() === selectedSubject.toLowerCase();
  });

  if (!isOpen) return null;

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCurrentMastered = currentCard ? masteredCards.has(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastery = (cardId: string) => {
    const updated = new Set(masteredCards);
    if (updated.has(cardId)) {
      updated.delete(cardId);
    } else {
      updated.add(cardId);
    }
    setMasteredCards(updated);
  };

  const masteryPercent = filteredCards.length 
    ? Math.round((masteredCards.size / filteredCards.length) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Active Recall Deck
                </span>
                <span className="text-xs text-slate-300">CBSE Class 10 High-Yield</span>
              </div>
              <h2 className="text-lg font-black text-white mt-0.5">
                Formula & Concept Flashcards
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
          
          {/* Controls & Progress Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Subject Tabs */}
            <div className="flex rounded-xl bg-slate-200/80 p-1 text-xs font-bold">
              {['All', 'Mathematics', 'Science'].map(sub => (
                <button
                  key={sub}
                  onClick={() => { setSelectedSubject(sub); setCurrentIndex(0); setIsFlipped(false); }}
                  className={`px-3 py-1 rounded-lg transition capitalize ${
                    selectedSubject === sub ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Mastery Counter */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="text-right">
                <div className="font-bold text-slate-700">Mastery Progress</div>
                <div className="text-[11px] text-emerald-600 font-semibold">{masteredCards.size} of {filteredCards.length} Mastered</div>
              </div>
              <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${masteryPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Flashcard 3D Perspective Area */}
          {currentCard ? (
            <div className="perspective-1000">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full min-h-[300px] sm:min-h-[340px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500 transform shadow-xl flex flex-col justify-between border-2 ${
                  isFlipped 
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-prime-orange/60' 
                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Card Top Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100/20">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      currentCard.subject === 'Mathematics'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {currentCard.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      • {currentCard.chapter}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>

                {/* Card Center Content */}
                <div className="py-6 space-y-4">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-prime-orange bg-prime-orange/10 px-2.5 py-1 rounded-md">
                        Prompt / Question
                      </span>
                      <h3 className="text-lg sm:text-xl font-black leading-snug">
                        {currentCard.frontQuestion}
                      </h3>
                      <p className="text-xs text-slate-400 pt-2 flex items-center">
                        <RotateCw className="w-3.5 h-3.5 mr-1 text-slate-400 animate-spin-slow" />
                        Tap or click card to flip and verify answer
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded-md">
                        Verified Formula & Solution
                      </span>
                      
                      {/* Highlighted Formula Block */}
                      <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 font-mono text-sm sm:text-base font-black text-amber-300 shadow-inner">
                        {currentCard.keyFormula}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                        {currentCard.backAnswer}
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300 mr-1">Faculty Tip:</span>
                          <span>{currentCard.examNote}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Meta */}
                <div className="pt-3 border-t border-slate-100/20 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {isFlipped ? 'Click again to return to question' : 'Active Recall Card'}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isCurrentMastered ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'
                  }`}>
                    {isCurrentMastered ? '✓ Mastered' : 'Pending Mastery'}
                  </span>
                </div>

              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No flashcards available in this category.
            </div>
          )}

          {/* Controls: Prev / Flip / Next & Mastery Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Previous Card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5"
              >
                <RotateCw className="w-4 h-4 text-prime-orange" />
                <span>Flip Card (Space)</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Next Card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {currentCard && (
              <button
                onClick={() => toggleMastery(currentCard.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
                  isCurrentMastered
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
              </button>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Keyboard shortcut: Click card to flip • Press Next to cycle
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition"
          >
            Done Practicing
          </button>
        </div>

      </div>
    </div>
  );
}
