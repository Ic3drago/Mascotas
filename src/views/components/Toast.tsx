import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';

interface Props {
  message: string | null;
}

export const Toast: React.FC<Props> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2700);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } z-50`}
    >
      <Info size={20} className="text-indigo-400 dark:text-indigo-600" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
