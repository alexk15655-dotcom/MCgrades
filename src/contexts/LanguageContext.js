import React, { createContext, useState, useCallback, useEffect } from 'react';
import ru from '../constants/translations/ru';
import en from '../constants/translations/en';
import ar from '../constants/translations/ar';
import fr from '../constants/translations/fr';
import es from '../constants/translations/es';
import uz from '../constants/translations/uz';
import LanguageSelector from '../components/LanguageSelector';

const TRANSLATIONS = { ru, en, ar, fr, es, uz };
const RTL_LANGUAGES = ['ar']; // Языки с направлением справа налево

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Устанавливаем направление текста для всего документа
  useEffect(() => {
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
  }, [language]);

  const changeLanguage = useCallback((newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
    }
  }, []);

  if (!language) {
    return <LanguageSelector onSelect={changeLanguage} />;
  }

  const value = {
    language,
    translations: TRANSLATIONS[language],
    changeLanguage,
    availableLanguages: Object.keys(TRANSLATIONS),
    isRTL: RTL_LANGUAGES.includes(language)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};