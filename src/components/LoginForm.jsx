import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from './LanguageSwitch';

const ADMIN = { id: 'ADMIN', password: '12345' };
const PROMO_KEYWORDS = ['GOALS', 'PROMO'];  // Добавить здесь


const LoginForm = ({ onLogin, groups }) => {
  const { t } = useTranslation();
  const [posId, setPosId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkAccess = (id) => {
    if (id === ADMIN.id) return true;
    return groups.some(group => group.whiteList.includes(id));
  };

  const parseInput = (input) => {
    const parts = input.split(',').map(part => part.trim());
    // В начало функции parseInput добавить:
    if (input.includes(':')) {
      const [id, keyword] = input.split(':').map(part => part.trim().toUpperCase());
    if (PROMO_KEYWORDS.includes(keyword)) {
      return {
      posId: id,
      isGoalsPage: true
      };
    }
}
    
    // Если частей больше 1, считаем это вводом с метриками
    if (parts.length > 1 && parts.length === 4) {
      return {
        posId: parts[0],
        metrics: {
          deposits: Number(parts[1]),
          prepayments: Number(parts[2]),
          users: Number(parts[3])
        }
      };
    }
    
    // Иначе считаем это просто ID кассы
    return {
      posId: parts[0],
      metrics: null
    };
  };

  const handleLogin = () => {
    setError('');

    if (!posId) {
      setError(t('auth.enterPosIdError'));
      return;
    }

    // Деструктурируем все нужные поля из результата parseInput
    const { posId: parsedPosId, metrics, isGoalsPage } = parseInput(posId);

    if (parsedPosId === ADMIN.id) {
      if (password === ADMIN.password) {
        onLogin({ posId: parsedPosId, isAdmin: true, isLoggedIn: true });
      } else {
        setError(t('auth.wrongPassword'));
      }
      return;
    }

    if (!checkAccess(parsedPosId)) {
      setError(t('auth.accessDenied'));
      return;
    }

    onLogin({ 
      posId: parsedPosId, 
      isAdmin: false, 
      isLoggedIn: true,
      isGoalsPage: isGoalsPage || false,  // теперь isGoalsPage определен
      initialMetrics: metrics || { deposits: 0, prepayments: 0, users: 0 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
      <div className="flex justify-center items-center space-x-4">
        <h1 className="text-2xl font-bold">{t('common.login')}</h1>
        <LanguageSwitch />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 flex items-start space-x-2">
          <AlertCircle className="text-red-500 mt-0.5" size={18} />
          <span className="text-red-600">{error}</span>
        </div>
      )}

      <input
        value={posId}
        onChange={e => {
          setPosId(e.target.value.toUpperCase());
          setError('');
        }}
        className="w-full p-2 border rounded"
        placeholder={t('auth.enterPosId')}
      />
      
      {posId === ADMIN.id && (
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
          className="w-full p-2 border rounded"
          placeholder={t('auth.enterPassword')}
        />
      )}

      <button 
        onClick={handleLogin}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        {t('common.login')}
      </button>
    </div>
  );
};

export default LoginForm;