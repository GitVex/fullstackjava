// components/NotificationButton.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationButtonProps {
  buttonText: string;
  notificationText: string;
  className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  buttonText,
  notificationText,
  className = '',
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="">
      <button
        className={`rounded border-blue-500 border-r-8 border px-4 py-2 font-semibold text-white hover:bg-blue-600 duration-200 ${className}`}
        onClick={handleButtonClick}
      >
        <AnimatePresence>
          {showNotification && (
            <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '-20%', y: '-80%' }}
            animate={{ opacity: 1, scale: 1, x: '-20%', y: '-120%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-20%', y: '-80%' }}
            transition={{ duration: 0.2 }}
            className="absolute w-24 h-12 text-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          )}
        </AnimatePresence>
        {buttonText}
      </button>
    </div>
  );
};

export default NotificationButton;
