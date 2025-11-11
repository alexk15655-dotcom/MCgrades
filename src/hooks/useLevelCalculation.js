export const useLevelCalculation = (group, metrics) => {
  let currentLevel = null;
  let nextLevel = group.levels[0];
  
  if (+metrics.deposits >= +group.levels[0].deposits && 
      +metrics.prepayments >= +group.levels[0].prepayments && 
      +metrics.users >= +group.levels[0].users) {
      
      for (let i = group.levels.length - 1; i >= 0; i--) {
          if (+metrics.deposits >= +group.levels[i].deposits && 
              +metrics.prepayments >= +group.levels[i].prepayments && 
              +metrics.users >= +group.levels[i].users) {
              currentLevel = group.levels[i];
              nextLevel = group.levels[i + 1] || null;
              break;
          }
      }
  }

  const progress = (() => {
    if (!nextLevel) return 100;
    const depositsProgress = (+metrics.deposits / +nextLevel.deposits) * 100;
    const prepaymentsProgress = (+metrics.prepayments / +nextLevel.prepayments) * 100;
    const usersProgress = (+metrics.users / +nextLevel.users) * 100;
    return Math.min((depositsProgress + prepaymentsProgress + usersProgress) / 3, 100);
  })();

  return { currentLevel, nextLevel, progress };
};