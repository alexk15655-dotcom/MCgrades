export default {
  common: {
    login: 'Вход в систему',
    logout: 'Выйти',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить'
  },
  auth: {
    enterPosId: 'Введите ID кассы',
    enterPassword: 'Введите пароль',
    accessDenied: 'Доступ запрещен. ID кассы отсутствует в списке разрешенных.',
    wrongPassword: 'Неверный пароль администратора',
    enterPosIdError: 'Введите ID кассы'
  },
  admin: {
    title: 'Панель администратора',
    addGroup: 'Добавить новую группу',
    deleteGroup: 'Удаление группы',
    deleteConfirm: 'Вы уверены, что хотите удалить группу "{name}"? Это действие нельзя отменить.',
    cantDeleteLastGroup: 'Невозможно удалить последнюю группу',
    groupId: 'ID группы',
    groupName: 'Название группы',
    whiteList: 'White List группы "{name}"',
    posId: 'ID кассы'
  },
  agent: {
    title: 'Панель кассира #{id}',
    group: 'Группа',
    currentLevel: 'Текущий уровень',
    noLevel: 'Нет уровня',
    availableBonuses: 'Доступные бонусы',
    nextLevelRequirements: 'До следующего уровня {level} требуется',
    totalProgress: 'Общий прогресс до следующего уровня',
    newBonuses: 'Новые бонусы на следующем уровне',
    currentProgress: 'Текущий прогресс по уровням',
    noBonuses: 'Нет доступных бонусов',
    newBonusesAtLevel: 'Новые бонусы на этом уровне',
    requirements: 'Требования',
  },
  bonuses: {
    balanceControl: 'Контроль баланса',
    verification: 'Верификация агента',
    webManagement: 'WebManagement',
    subAgents: 'Суб-агенты',
    methodButton: 'Кнопка на сайте',
    recommended: 'В "Рекоменуемые"',
    transactionHistory: 'История транзакций',
    radiusIncrease: 'Увеличение радиуса +100%',
    demoAccount: 'Демо-аккаунт',
    reddyChat: 'Пометка в чате Reddy',
    prioritySupport: 'Внеочередная поддержка'
  },
  metrics: {
    deposits: 'Депозиты',
    prepayments: 'Предоплаты',
    users: 'Пользователи',
    sumDeposits: 'Сумма депозитов',
    sumPrepayments: 'Сумма предоплат',
    userCount: 'чел.'
  }
};
