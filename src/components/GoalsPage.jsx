import React from 'react';
import { Star, Trophy, Gift } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from './LanguageSwitch';

const styles = {
  heading: 'text-base font-semibold text-gray-900',
  grayText: 'text-base text-gray-600',
  boldText: 'text-base font-medium text-gray-900',
  card: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200'
};

const LevelHeader = ({ title, id }) => (
  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
    <div className="flex items-center space-x-2">
      <Star className="text-yellow-500 w-5 h-5" />
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    <div className="text-sm font-medium text-gray-500">Level {id}</div>
  </div>
);

const LevelRequirements = ({ level }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h3 className={styles.heading}>{t('agent.requirements')}</h3>
      <div className="flex justify-between items-center">
        <span className={styles.grayText}>{t('metrics.deposits')}</span>
        <span className={styles.boldText}>${level.deposits.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={styles.grayText}>{t('metrics.prepayments')}</span>
        <span className={styles.boldText}>${level.prepayments.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={styles.grayText}>{t('metrics.users')}</span>
        <span className={styles.boldText}>{level.users} {t('metrics.userCount')}</span>
      </div>
    </div>
  );
};

const BonusBadge = ({ bonus }) => {
  const { t } = useTranslation();
  
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
      <span>✨</span>
      {t(`bonuses.${bonus}`)}
    </span>
  );
};

const LevelBonuses = ({ level, previousLevel }) => {
  const { t } = useTranslation();
  const newBonuses = previousLevel
    ? level.bonuses.filter(bonus => !previousLevel.bonuses.includes(bonus))
    : level.bonuses;

  return (
    <div>
      <h3 className={styles.heading}>
        <span className="flex items-center space-x-2">
          <Gift className="text-purple-500 w-5 h-5" />
          <span>{t('agent.newBonusesAtLevel')}</span>
        </span>
      </h3>
      <div className="space-y-2">
        {newBonuses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {newBonuses.map(bonus => (
              <BonusBadge key={bonus} bonus={bonus} />
            ))}
          </div>
        ) : (
          <div className={styles.grayText}>{t('agent.noBonuses')}</div>
        )}
      </div>
    </div>
  );
};

const LevelCard = ({ level, previousLevel }) => (
  <div className={styles.card}>
    <LevelHeader title={level.title} id={level.id} />
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-6">
        <LevelRequirements level={level} />
        <LevelBonuses level={level} previousLevel={previousLevel} />
      </div>
    </div>
  </div>
);

const PageHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center space-x-3">
      <Trophy className="text-yellow-500 w-8 h-8" />
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
    <LanguageSwitch />
  </div>
);

const GoalsPage = ({ group }) => {
  const { isRTL } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader title={group.title} />
      <div className="grid gap-4">
        {group.levels.map((level, index) => (
          <LevelCard
            key={level.id}
            level={level}
            previousLevel={index > 0 ? group.levels[index - 1] : null}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;