import { useState, useEffect, useRef, useCallback } from 'react';

const SlideMenu = ({
  menuItems = [],
  onItemClick,
  progressBarColor = "#fbf1c7",
  menuBgColor = "#1d2021",
  buttonColor = "#fbf1c7"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = Math.min(scrollY / documentHeight, 1);

    if (progressRef.current) {
      progressRef.current.style.height = `${progress * 100}%`;
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress]);

  const handleItemClick = (item) => {
    setIsOpen(false);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <>
      {/* Menu Button and Progress Bar */}
      <div className="fixed top-0 right-0 h-full z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`magic-hover magic-hover__square absolute top-8 right-8 w-12 h-12 flex flex-col justify-center items-center transition-transform duration-500 hover:scale-110 ${
            isOpen ? 'gap-1' : 'gap-1.5'
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-8 h-1 transition-all duration-500 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            style={{ backgroundColor: buttonColor }}
          />
          <span
            className={`block w-8 h-1 transition-all duration-500 ${
              isOpen ? 'opacity-0' : ''
            }`}
            style={{ backgroundColor: buttonColor }}
          />
          <span
            className={`block w-8 h-1 transition-all duration-500 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            style={{ backgroundColor: buttonColor }}
          />
        </button>

        {/* Scroll Progress Bar */}
        <div
          className={`absolute top-0 right-0 w-1.5 h-full transition-opacity duration-500 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: `${progressBarColor}20` }}
        >
          <div
            ref={progressRef}
            className="absolute top-0 right-0 w-full will-change-transform"
            style={{
              height: '0%',
              backgroundColor: progressBarColor,
              boxShadow: `0 0 10px ${progressBarColor}50`,
              transition: 'none'
            }}
          />
        </div>
      </div>

      {/* Slide Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-500 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: menuBgColor }}
      >
        <nav className="h-full flex flex-col justify-center items-center px-8">
          <ul className="space-y-6">
            {menuItems.map((item, index) => (
              <li key={index} className="overflow-hidden">
                <button
                  onClick={() => handleItemClick(item)}
                  className={`magic-hover magic-hover__square text-2xl font-light transition-all duration-500 hover:translate-x-2 block ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                  style={{
                    color: progressBarColor,
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Always-mounted Backdrop */}
      <div
        className={`fixed inset-0 z-20 transition-opacity duration-500 bg-dark4 ${
          isOpen ? 'opacity-90 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default SlideMenu;
