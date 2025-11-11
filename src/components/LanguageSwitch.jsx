import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'uz', name: 'Ozbek', flag: '🇺🇿' }
];

const LanguageSwitch = () => {
  const { language, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <Globe size={20} />
        <span>{LANGUAGES.find(lang => lang.code === language)?.flag}</span>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 py-2 w-48 bg-white rounded-lg shadow-lg z-50">
            {LANGUAGES.map(({ code, name, flag }) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50
                          ${code === language ? 'bg-blue-50' : ''}`}
              >
                <span>{flag}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitch;
