import React from 'react';
import './booster-wow.css';

/* Nút "Đặt câu hỏi" trôi ở góc phải dưới, kiểu lá thư giống trang WoW, mở Discord */
export const AskFloat: React.FC<{ lang?: 'vi' | 'en' }> = ({ lang = 'vi' }) => (
  <a className="ask-float" href="https://discord.gg/t2fPyUPGY" target="_blank" rel="noopener noreferrer" aria-label={lang === 'vi' ? 'Đặt câu hỏi qua Discord' : 'Ask a question on Discord'}>
    <span className="af-mail" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
    </span>
    <span className="af-line">{lang === 'vi' ? 'Đặt câu hỏi' : 'Ask a question'}</span>
    <svg className="af-pen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3.5a2.1 2.1 0 0 1 3 3L8 18.5l-4 1 1-4Z" /><path d="m15 5.5 3 3" /></svg>
  </a>
);
