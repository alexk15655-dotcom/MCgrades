export default {
  common: {
    login: 'Connexion',
    logout: 'Déconnexion',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter'
  },
  auth: {
    enterPosId: 'Entrez ID du point de vente',
    enterPassword: 'Entrez le mot de passe',
    accessDenied: 'Accès refusé. ID du point de vente nest pas dans la liste autorisée.',
    wrongPassword: 'Mot de passe administrateur incorrect',
    enterPosIdError: 'Entrez ID du point de vente'
  },
  admin: {
    title: 'Panneau dadministration',
    addGroup: 'Ajouter un nouveau groupe',
    deleteGroup: 'Supprimer le groupe',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer le groupe "{name}" ? Cette action ne peut pas être annulée.',
    cantDeleteLastGroup: 'Impossible de supprimer le dernier groupe',
    groupId: 'ID du groupe',
    groupName: 'Nom du groupe',
    whiteList: 'Liste blanche du groupe "{name}"',
    posId: 'ID du point de vente'
  },
  agent: {
    title: 'Panneau de lagent #{id}',
    group: 'Groupe',
    currentLevel: 'Niveau actuel',
    noLevel: 'Pas de niveau',
    availableBonuses: 'Bonus disponibles',
    nextLevelRequirements: 'Conditions pour le niveau suivant {level}',
    totalProgress: 'Progression totale vers le niveau suivant',
    newBonuses: 'Nouveaux bonus au niveau suivant',
    currentProgress: 'Progrès actuel par niveaux',
    noBonuses: 'Aucun bonus disponible',
    newBonusesAtLevel: 'Nouveaux bonus à ce niveau',
    requirements: 'Conditions',
  },
  metrics: {
    deposits: 'Dépôts',
    prepayments: 'Prépaiements',
    users: 'Utilisateurs',
    sumDeposits: 'Montant des dépôts',
    sumPrepayments: 'Montant des prépaiements',
    userCount: 'pers.'
  },
  bonuses: {
    balanceControl: 'Contrôle du solde',
    verification: 'Vérification',
    webManagement: 'WebManagement',
    subAgents: 'Sous-agents',
    methodButton: 'Bouton de méthode',
    recommended: 'Dans "Recommandés"',
    transactionHistory: 'Historique des transactions',
    radiusIncrease: 'Augmentation du rayon +100%',
    demoAccount: 'Compte démo',
    reddyChat: 'Marque dans le chat Reddy',
    prioritySupport: 'Support prioritaire'
  }
};
