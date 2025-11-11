import React from 'react';

const AVAILABLE_LANGUAGES = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'uz', name: 'Ozbek', flag: '🇺🇿' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  // Можно добавлять новые языки здесь
];

const LanguageSelector = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Select Language</h1>
        <div className="grid grid-cols-2 gap-4">
          {AVAILABLE_LANGUAGES.map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => onSelect(code)}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">{flag}</span>
              <span className="text-lg">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;