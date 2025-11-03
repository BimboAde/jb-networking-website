'use client';

import { useState } from 'react';

export const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-center justify-between"
        aria-expanded={open}
      >
        <h3 className="text-lg font-bold text-brand-green">{question}</h3>
        <span className="text-brand-green font-bold">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="text-gray-600 mt-3">{answer}</p>}
    </div>
  );
};


