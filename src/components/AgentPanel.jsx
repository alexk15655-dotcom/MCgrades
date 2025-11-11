import React, { useState } from 'react';
import { Store, Award, Wallet, Users, CreditCard, LogOut, AlertCircle, Check } from 'lucide-react';
import { useLevelCalculation } from '../hooks/useLevelCalculation';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from './LanguageSwitch';
import LevelsProgressBar from './LevelsProgressBar';
import { ADMIN, PROMO_KEYWORDS } from '../constants/auth';

const MetricsInput = ({ metrics, onChange }) => {
  const { t, isRTL } = useTranslation();
  
  const fields = [
    {
      key: 'deposits',
      icon: Wallet,
      label: t('metrics.deposits'),
      placeholder: t('metrics.sumDeposits'),
    },
    {
      key: 'prepayments',
      icon: CreditCard,
      label: t('metrics.prepayments'),
      placeholder: t('metrics.sumPrepayments'),
    },
    {
      key: 'users',
      icon: Users,
      label: t('metrics.users'),
      placeholder: t('metrics.userCount'),
    },
  ];

  return (
    <div className='grid grid-cols-3 gap-4'>
      {fields.map(({ key, icon: Icon, label, placeholder }) => (
        <div key={key}>
          <label className='flex items-center space-x-2'>
            <Icon className='text-gray-500' />
            <span>{label}</span>
          </label>
          <input
            value={metrics[key]}
            onChange={e => onChange({ ...metrics, [key]: Number(e.target.value) })}
            className={`w-full p-2 border rounded ${isRTL ? 'text-right' : 'text-left'}`}
            placeholder={placeholder}
            type="number"
          />
        </div>
      ))}
    </div>
  );
};

const ProgressBar = ({ value }) => {
  const { t, isRTL } = useTranslation();
  
  return (
    <div>
      <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
        {isRTL ? (
          <>
            <span>{value.toFixed(1)}% </span>
            <span>{t('agent.totalProgress')}</span>
          </>
        ) : (
          <>
            <span>{t('agent.totalProgress')} </span>
            <span>{value.toFixed(1)}%</span>
          </>
        )}
      </div>
      <div className="relative" dir="ltr">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const CurrentLevel = ({ level }) => {
  const { t, isRTL } = useTranslation();
  
  return (
    <div className='bg-blue-50 rounded-lg p-4 space-y-4'>
      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award className='text-blue-500' />
            <div>
              <h3 className='font-semibold'>{t('agent.currentLevel')}</h3>
              <p className='text-lg font-bold mt-1'>
                {level ? level.title : t('agent.noLevel')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {level?.bonuses?.length > 0 && (
        <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
          <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
            <h4 className='font-medium'>{t('agent.availableBonuses')}:</h4>
          </div>
          {level.bonuses.map(bonus => (
            <div key={bonus} style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} className='text-green-500' />
                <span>{t(`bonuses.${bonus}`)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NextLevelInfo = ({ currentLevel, nextLevel, metrics }) => {
  const { t, isRTL } = useTranslation();
  
  if (!nextLevel) return null;

  const requirements = [
    {
      label: t('metrics.deposits'),
      value: Math.max(nextLevel.deposits - metrics.deposits, 0),
      suffix: '$',
    },
    {
      label: t('metrics.prepayments'),
      value: Math.max(nextLevel.prepayments - metrics.prepayments, 0),
      suffix: '$',
    },
    {
      label: t('metrics.users'),
      value: Math.max(nextLevel.users - metrics.users, 0),
      suffix: t('metrics.userCount'),
    },
  ];

  return (
    <div className='p-4 bg-gray-50 rounded-lg space-y-3'>
      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 className='font-semibold'>{t('agent.nextLevelRequirements', { level: nextLevel.title })}:</h3>
          </div>
        </div>
      </div>

      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        {requirements.map(({ label, value, suffix }) => (
          <div key={label} style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{label}: </span>
              <span>{value.toLocaleString()} {suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {nextLevel.bonuses.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
            <h4 className='font-medium mb-2'>{t('agent.newBonuses')}:</h4>
          </div>
          {nextLevel.bonuses
            .filter(bonus => !currentLevel?.bonuses?.includes(bonus))
            .map(bonus => (
              <div key={bonus} style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} className='text-gray-400' />
                  <span>{t(`bonuses.${bonus}`)}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

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
    if (input.includes(':')) {
      const [id, keyword] = input.split(':').map(part => part.trim().toUpperCase());
      if (PROMO_KEYWORDS.includes(keyword)) {
        return {
          posId: id,
          isGoalsPage: true
        };
      }
    }

    const parts = input.split(',').map(part => part.trim());
    
    if (parts.length > 1 && parts.length === 4) {
      return {
        posId: parts[0],
        metrics: {
          deposits: Number(parts[1]) || 0,
          prepayments: Number(parts[2]) || 0,
          users: Number(parts[3]) || 0
        }
      };
    }
    
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
      isGoalsPage: isGoalsPage || false,
      initialMetrics: metrics || { deposits: 0, prepayments: 0, users: 0 }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-start">
        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
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
          className="flex-1 p-2 border rounded min-w-[200px]"
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
            className="flex-1 p-2 border rounded min-w-[200px]"
            placeholder={t('auth.enterPassword')}
          />
        )}

        <button 
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t('common.login')}
        </button>
      </div>
    </div>
  );
};

const AgentPanel = ({ posId, group, metrics, onMetricsChange, groups, onLogout, onLogin }) => {
  const { t, isRTL } = useTranslation();
  const { currentLevel, nextLevel, progress } = useLevelCalculation(group, metrics);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center space-x-2'>
          <Store />
          <h2 className='text-xl font-bold'>
            {t('agent.title', { id: posId })}
          </h2>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='text-sm text-gray-500'>
            {t('agent.group')}: {group.title}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>{t('common.logout')}</span>
          </button>
          <LanguageSwitch />
        </div>
      </div>

      <LoginForm onLogin={onLogin} groups={groups} />

      <MetricsInput metrics={metrics} onChange={onMetricsChange} />

      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <CurrentLevel level={currentLevel} />
      </div>

      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <ProgressBar value={progress} />
      </div>

      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <LevelsProgressBar 
          levels={group.levels}
          currentLevel={currentLevel} 
        />
      </div>

      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
        <NextLevelInfo
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          metrics={metrics}
        />
      </div>
    </div>
  );
};

export default AgentPanel;
