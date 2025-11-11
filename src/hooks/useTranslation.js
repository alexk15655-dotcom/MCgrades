import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { translations, language, changeLanguage, availableLanguages } = useContext(LanguageContext);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Замена параметров в строке перевода
    if (typeof value === 'string') {
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(`{${param}}`, val),
        value
      );
    }

    return value;
  };

  return {
    t,
    language,
    changeLanguage,
    availableLanguages
  };
};