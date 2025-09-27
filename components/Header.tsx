import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <CodeIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
            AI Code Reviewer
          </h1>
        </div>
      </div>
    </header>
  );
};