import React from 'react';

interface ReviewOutputProps {
  review: string;
}

const Placeholder: React.FC = () => (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-400">Waiting for review</h3>
        <p className="mt-1 text-sm">Your code review feedback will appear here once it's generated.</p>
    </div>
);

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review }) => {
  if (!review) {
    return <Placeholder />;
  }

  // A simple markdown-to-html conversion for display
  const createMarkup = (text: string) => {
    let html = text;
    
    // This is a basic parser. For full markdown, a library would be better.
    // Using typography plugin helps a lot. This adds some basic structure.
    html = html
      .replace(/^### (.*$)/gim, '<h3 class="!text-lg !font-semibold !text-cyan-400 !mt-6 !mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="!text-xl !font-bold !text-gray-100 !mt-8 !mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="!text-2xl !font-extrabold !text-white !mt-10 !mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="!text-sm !font-mono !bg-gray-700 !text-amber-300 !py-0.5 !px-1.5 !rounded">$1</code>')
      .replace(/```(.*?)```/gs, (match, p1) => {
        const lines = p1.trim().split('\n');
        const lang = lines[0];
        const code = lines.slice(1).join('\n');
        return `<pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      })
      .replace(/^\* (.*$)/gim, '<li>$1</li>');

    return { __html: html };
  };

  return (
    <div className="prose prose-invert prose-sm max-w-none flex-grow overflow-y-auto pr-2">
      <div dangerouslySetInnerHTML={createMarkup(review)} />
    </div>
  );
};