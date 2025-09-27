import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { Loader } from './components/Loader';
import { reviewCode } from './services/geminiService';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err) {
      console.error(err);
      setError('Failed to get code review. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onReview={handleReview}
            isLoading={isLoading}
          />
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 relative min-h-[600px] flex flex-col">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Review Feedback</h2>
            {isLoading && (
              <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center rounded-lg">
                <Loader />
              </div>
            )}
            {error && (
               <div className="flex-grow flex items-center justify-center text-center">
                 <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">
                   <p className="font-bold">An Error Occurred</p>
                   <p className="text-sm">{error}</p>
                 </div>
               </div>
            )}
            {!isLoading && !error && (
              <ReviewOutput review={review} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;