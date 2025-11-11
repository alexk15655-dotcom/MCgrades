import { BONUSES } from './bonuses';

export const INITIAL_GROUPS = [
  {
    id: '310Mor',
    title: 'PariPulse Morocco',
    levels: [
      { id: 1, title: "Standard", deposits: 0, prepayments: 0, users: 0, bonuses: [] },
      { id: 2, title: "Advanced", deposits: 2000, prepayments: 1000, users: 15, bonuses: ['verification', 'transactionHistory', 'radiusIncrease'] },
      { id: 3, title: "Superior", deposits: 4000, prepayments: 2500, users: 25, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement'] },
      { id: 4, title: "Premium", deposits: 6000, prepayments: 4000, users: 40, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement','methodButton', 'balanceControl', 'radiusIncrease', 'reddyChat'] },
      { id: 5, title: "VIP", deposits: 20000, prepayments: 15000, users: 100, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement','methodButton', 'balanceControl', 'radiusIncrease', 'reddyChat','recommended','prioritySupport'] }
    ],
    whiteList: ['1144','1196625','1205493','1207433','1209043','1210164','1213919','1231965','1297199',
    '1318959','1197301','1197514','1197659','1197989','1198092','1209248','1319975','1221173','1229916',
    '1236471','1265809','1297675','1269619','1269719','1271652','1294045','1294794','1306538','1314396',
    '1323652','1326565','1328622','1329880','1245448','1208897','1216007','1254496','1287773','1288920',
    '1319113','1328538'
]
  },
  {
    id: '310Egp',
    title: 'PariPulse Egypt',
    levels: [
      { id: 1, title: "Regular", deposits: 0, prepayments: 0, users: 0, bonuses: [] },
      { id: 2, title: "Senior", deposits: 1500, prepayments: 800, users: 20, bonuses: ['verification', 'transactionHistory', 'radiusIncrease'] },
      { id: 3, title: "Expert", deposits: 3500, prepayments: 2000, users: 40, bonuses: ['subAgents', 'webManagement', 'radiusIncrease'] },
      { id: 4, title: "Master", deposits: 5000, prepayments: 3500, users: 60, bonuses: ['methodButton', 'balanceControl', 'reddyChat'] },
      { id: 5, title: "VIP", deposits: 18000, prepayments: 13000, users: 140, bonuses: [...BONUSES] }
    ],
    whiteList: ['9876','6789','9999']
  },
  {
    id: '344Bang',
    title: 'Yohoho Bangladesh',
    levels: [
      { id: 1, title: "Standard", deposits: 0, prepayments: 0, users: 0, bonuses: [] },
      { id: 2, title: "Advanced", deposits: 1000, prepayments: 500, users: 25, bonuses: ['verification', 'transactionHistory', 'radiusIncrease'] },
      { id: 3, title: "Superior", deposits: 3000, prepayments: 1500, users: 75, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement'] },
      { id: 4, title: "Premium", deposits: 4000, prepayments: 2000, users: 100, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement','methodButton', 'balanceControl', 'radiusIncrease', 'reddyChat'] },
      { id: 5, title: "VIP", deposits: 15000, prepayments: 7500, users: 200, bonuses: ['verification', 'transactionHistory','subAgents', 'webManagement','methodButton', 'balanceControl', 'radiusIncrease', 'reddyChat','recommended','prioritySupport'] }
    ],
    whiteList: ['1155','5511'
]
  }
];