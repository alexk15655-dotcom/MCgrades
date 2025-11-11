import React, { useState, useCallback } from 'react';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import AgentPanel from './components/AgentPanel';
import GoalsPage from './components/GoalsPage';
import { INITIAL_GROUPS } from './constants/groups';

const App = () => {
  const [auth, setAuth] = useState({ 
    posId: '', 
    isAdmin: false, 
    isLoggedIn: false,
    isGoalsPage: false
  });

  const [metrics, setMetrics] = useState({ 
    deposits: 0, 
    prepayments: 0, 
    users: 0 
  });

  const [groups, setGroups] = useState(() => {
    try {
      const savedGroups = localStorage.getItem('groups');
      return savedGroups ? JSON.parse(savedGroups) : INITIAL_GROUPS;
    } catch (error) {
      console.error('Failed to load groups from localStorage:', error);
      return INITIAL_GROUPS;
    }
  });

  const [selectedGroupId, setSelectedGroupId] = useState(() => {
    return groups[0]?.id || null;
  });

  const handleGroupsUpdate = useCallback((newGroups, newSelectedId = null) => {
    if (!Array.isArray(newGroups) || newGroups.length === 0) {
      console.error('Invalid groups data');
      return;
    }

    setGroups(newGroups);

    try {
      localStorage.setItem('groups', JSON.stringify(newGroups));
    } catch (error) {
      console.error('Failed to save groups to localStorage:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please clear some data.');
      }
    }

    if (newSelectedId) {
      setSelectedGroupId(newSelectedId);
    } else if (!newGroups.find(g => g.id === selectedGroupId)) {
      setSelectedGroupId(newGroups[0].id);
    }
  }, [selectedGroupId]);

  const handleLogin = useCallback((authData) => {
    setAuth(authData);
    if (authData.initialMetrics) {
      setMetrics(authData.initialMetrics);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAuth({ 
      posId: '', 
      isAdmin: false, 
      isLoggedIn: false,
      isGoalsPage: false 
    });
    setMetrics({ 
      deposits: 0, 
      prepayments: 0, 
      users: 0 
    });
  }, []);

  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  if (!auth.isLoggedIn) {
    return <LoginForm onLogin={handleLogin} groups={groups} />;
  }

  if (auth.isGoalsPage) {
    const group = groups.find(g => g.whiteList.includes(auth.posId)) || groups[0];
    return <GoalsPage group={group} />;
  }

  if (auth.isAdmin) {
    return (
      <AdminPanel
        groups={groups}
        selectedGroupId={selectedGroupId}
        onGroupUpdate={handleGroupsUpdate}
      />
    );
  }

  const agentGroup = groups.find(g => g.whiteList.includes(auth.posId)) || groups[0];

  return (
    <AgentPanel
      posId={auth.posId}
      group={agentGroup}
      groups={groups}
      metrics={metrics}
      onMetricsChange={handleMetricsChange}
      onLogout={handleLogout}
      onLogin={handleLogin}
    />
  );
};

export default App;
