"use client"
import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (


<button
  onClick={scrollToTop}
  className={`border-[#5271FF] border-[1px] w-[50px] h-[50px] rounded-full bg-[#C4CEFF] text-[#1C1B1F] fixed bottom-5 right-5 z-50 flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
>
  <FaChevronUp />
</button>

  );
};

export default ScrollUp;
