import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const LevelsProgressBar = ({ levels, currentLevel }) => {
  const { t, isRTL } = useTranslation();
  const [hoveredLevel, setHoveredLevel] = useState(null);
  
  const currentIndex = currentLevel ? levels.findIndex(l => l.id === currentLevel.id) : -1;
  const progress = (currentIndex >= 0) ? ((currentIndex) / (levels.length - 1)) * 100 : 0;

  return (
    <div className='mt-8 mb-12'>
      <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span>{t('agent.currentProgress')}</span>
      </div>
      
      <div className='relative' dir="ltr">
        {/* Основная полоса прогресса */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Вехи уровней */}
        <div className='absolute top-0 left-0 w-full h-4'>
          {levels.map((level, index) => {
            const isCurrentLevel = currentLevel && level.id === currentLevel.id;
            const position = (index / (levels.length - 1)) * 100;
            
            return (
              <div
                key={level.id}
                className="absolute"
                style={{ 
                  left: `${position}%`,
                  transform: 'translate(-50%, 0)'
                }}
              >
                {/* Маркер вехи */}
                <div
                  className={`relative w-4 h-4 rounded-full cursor-pointer border-2
                    ${isCurrentLevel 
                      ? 'bg-blue-600 border-white' 
                      : 'bg-white border-gray-400'}
                    ${hoveredLevel === level ? 'border-blue-400' : ''}
                  `}
                  onMouseEnter={() => setHoveredLevel(level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  {/* Стрелка для текущего уровня */}
                  {isCurrentLevel && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  )}
                </div>
                
                {/* Название уровня */}
                <div className={`absolute -bottom-6 whitespace-nowrap text-sm ${isRTL ? 'text-right' : 'text-left'}`} 
                     style={{
                       left: '50%',
                       transform: 'translateX(-50%)',
                       direction: isRTL ? 'rtl' : 'ltr'
                     }}>
                  {level.title}
                </div>

                {/* Тултип с требованиями и бонусами */}
                {hoveredLevel === level && (
                  <div className="absolute z-10 bottom-full mb-2" 
                       style={{
                         left: '50%',
                         transform: 'translateX(-50%)'
                       }}>
                    <div className={`bg-white shadow-lg rounded p-2 text-sm min-w-[250px] border ${
                      isRTL ? 'text-right' : 'text-left'
                    }`} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                      <div className='font-medium mb-2'>{level.title}</div>
                      
                      {/* Требования */}
                      <div className='space-y-1 mb-3'>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{t('metrics.deposits')}:</span>
                          <span className='font-medium'>${level.deposits.toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{t('metrics.prepayments')}:</span>
                          <span className='font-medium'>${level.prepayments.toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{t('metrics.users')}:</span>
                          <span className='font-medium'>{level.users} {t('metrics.userCount')}</span>
                        </div>
                      </div>

                      {/* Бонусы */}
                      {level.bonuses.length > 0 ? (
                        <>
                          <div className='font-medium mb-1'>{t('agent.availableBonuses')}:</div>
                          <ul className='space-y-1'>
                            {level.bonuses.map(bonus => (
                              <li key={bonus} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Check size={14} className='text-green-500 flex-shrink-0' />
                                <span>{t(`bonuses.${bonus}`)}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <div className='text-gray-500'>{t('agent.noBonuses')}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelsProgressBar;