"use client";

import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, ArrowRight, HelpCircle, Clock, Sparkles } from 'lucide-react';
import { getQuizQuestions, saveQuizResult } from '@/lib/db';

interface PracticeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  subject?: string;
  onCompleted?: () => void;
}

export default function PracticeQuizModal({
  isOpen,
  onClose,
  studentId,
  studentName,
  subject = 'Mathematics',
  onCompleted
}: PracticeQuizModalProps) {
  const questions = getQuizQuestions(subject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    saveQuizResult({
      studentId,
      studentName,
      quizTitle: `${subject} Chapter Mastery Test`,
      subject,
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
    });

    if (onCompleted) onCompleted();
  };

  const scoreCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((scoreCount / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                AI CHAPTER PRACTICE TEST
              </span>
              <h3 className="font-black text-lg mt-0.5">{subject} Mastery Quiz</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 border-4 border-amber-500/40 flex items-center justify-center mx-auto text-3xl font-black animate-bounce">
              {percentage}%
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Quiz Completed!</h4>
              <p className="text-sm text-slate-300">
                You scored <strong className="text-amber-400">{scoreCount} out of {questions.length}</strong> correct answers in {subject}.
              </p>
            </div>

            {/* Answer Explanations Review */}
            <div className="space-y-4 text-left max-h-72 overflow-y-auto p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Step-by-Step Solutions</h5>
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctOptionIndex;
                return (
                  <div key={q.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">Q{idx + 1}. {q.question}</span>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center space-x-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 flex items-center space-x-1 shrink-0">
                          <XCircle className="w-3 h-3" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Correct Answer: <strong className="text-emerald-400">{q.options[q.correctOptionIndex]}</strong>
                    </div>
                    <p className="text-[11px] text-indigo-300 bg-indigo-950/40 p-2 rounded-lg border border-indigo-900/40">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition shadow-lg"
              >
                Close & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="font-bold text-amber-400">Time Limit: Self-Paced</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl text-xs text-left font-semibold transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 disabled:opacity-30 hover:text-white transition"
              >
                Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedAnswers[currentIndex] === undefined}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition"
                >
                  Submit Practice Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentIndex] === undefined}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 disabled:opacity-50 transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
