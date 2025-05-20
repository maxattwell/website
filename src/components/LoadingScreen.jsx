import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-['Pirata_One'] fixed inset-0 z-50 flex items-center justify-center">
        {/* Left door */}
        <div
            className={`absolute inset-y-0 left-0 w-1/2 bg-background flex items-center justify-end transition-transform duration-1000 ease-in-out ${
            isExiting ? '-translate-x-full text-yellow' : 'translate-x-0 text-dark3'
            }`}
        >
            <div className="relative pr-4">
            <span className="text-4xl font-bold">load</span>
            {!isExiting && (
                <span className="absolute inset-0 text-4xl font-bold text-yellow bg-clip-text [animation:var(--animate-fill-text-left)]">
                load
                </span>
            )}
            </div>
        </div>

        {/* Right door */}
        <div
            className={`absolute inset-y-0 right-0 w-1/2 bg-background flex items-center justify-start transition-transform duration-1000 ease-in-out ${
            isExiting ? 'translate-x-full' : 'translate-x-0'
            }`}
        >
            <div className="relative pl-4">
            <span className="text-4xl font-bold text-dark3">ing...</span>
            {!isExiting && (
                <span className="absolute inset-0 text-4xl font-bold text-yellow bg-clip-text [animation:var(--animate-fill-text-right)]">
                ing...
                </span>
            )}
            </div>
        </div>
    </div>
  );
};

export default LoadingScreen;
