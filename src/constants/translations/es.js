export default {
  common: {
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar'
  },
  auth: {
    enterPosId: 'Ingrese ID del punto de venta',
    enterPassword: 'Ingrese la contraseña',
    accessDenied: 'Acceso denegado. El ID del punto de venta no está en la lista permitida.',
    wrongPassword: 'Contraseña de administrador incorrecta',
    enterPosIdError: 'Ingrese ID del punto de venta'
  },
  admin: {
    title: 'Panel de administración',
    addGroup: 'Agregar nuevo grupo',
    deleteGroup: 'Eliminar grupo',
    deleteConfirm: '¿Está seguro de que desea eliminar el grupo "{name}"? Esta acción no se puede deshacer.',
    groupId: 'ID del grupo',
    groupName: 'Nombre del grupo',
    whiteList: 'Lista blanca del grupo "{name}"',
    posId: 'ID del punto de venta'
  },
  agent: {
    title: 'Panel del agente #{id}',
    group: 'Grupo',
    currentLevel: 'Nivel actual',
    noLevel: 'Sin nivel',
    availableBonuses: 'Bonos disponibles',
    nextLevelRequirements: 'Requisitos para el siguiente nivel',
    totalProgress: 'Progreso total al siguiente nivel',
    newBonuses: 'Nuevos bonos en el siguiente nivel',
    currentProgress: 'Progreso actual por niveles',
    noBonuses: 'No hay bonos disponibles',
    newBonusesAtLevel: 'Nuevos bonos en este nivel',
     requirements: 'Requisitos',

  },
  metrics: {
    deposits: 'Depósitos',
    prepayments: 'Prepagos',
    users: 'Usuarios',
    sumDeposits: 'Monto de depósitos',
    sumPrepayments: 'Monto de prepagos',
    userCount: 'pers.'
  },
  bonuses: {
    balanceControl: 'Control de saldo',
    verification: 'Verificación',
    webManagement: 'WebManagement',
    subAgents: 'Sub-agentes',
    methodButton: 'Botón de método',
    recommended: 'En "Recomendados"',
    transactionHistory: 'Historial de transacciones',
    radiusIncrease: 'Aumento de radio +100%',
    demoAccount: 'Cuenta demo',
    reddyChat: 'Marca en chat Reddy',
    prioritySupport: 'Soporte prioritario'
  }
};