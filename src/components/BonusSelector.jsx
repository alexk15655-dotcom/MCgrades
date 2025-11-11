import React from 'react';
import { BONUSES } from '../constants/bonuses';
import { Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const BonusSelector = ({ value = [], onChange }) => {
  const { t } = useTranslation();

  return (
    <div className='grid grid-cols-2 gap-2'>
      {BONUSES.map(bonus => (
        <label
          key={bonus}
          className='flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer'
        >
          <input
            type='checkbox'
            checked={value.includes(bonus)}
            onChange={e =>
              onChange(
                e.target.checked
                  ? [...value, bonus]
                  : value.filter(b => b !== bonus)
              )
            }
            className='hidden'
          />
          <div
            className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${
              value.includes(bonus)
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
            }`}
          >
            {value.includes(bonus) && <Check size={16} className='text-white' />}
          </div>
          <span className='text-sm'>{t(`bonuses.${bonus}`)}</span>
        </label>
      ))}
    </div>
  );
};

export default BonusSelector;