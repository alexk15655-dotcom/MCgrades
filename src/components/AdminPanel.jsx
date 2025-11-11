import React, { useState } from 'react';
import { LockKeyhole, UserPlus, Plus, Pencil, Save, X } from 'lucide-react';
import BonusSelector from './BonusSelector';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from './LanguageSwitch';

const GroupHeader = ({ group, isEditing, editedTitle, onEdit, onSave, onCancel, onDelete }) => {
  const { t } = useTranslation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const DeleteConfirmation = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="text-xl font-bold mb-4">{t('admin.deleteGroup')}</h3>
        <p className="mb-6">{t('admin.deleteConfirm', { name: group.title })}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowDeleteConfirm(false);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showDeleteConfirm && <DeleteConfirmation />}
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <input
              value={editedTitle}
              onChange={e => onEdit(e.target.value)}
              className="p-2 border rounded"
              placeholder={t('admin.groupName')}
            />
          ) : (
            <h3 className="text-xl font-bold">{group.title}</h3>
          )}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                <Save size={20} />
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(group.title)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <X size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const WhiteList = ({ group, onUpdate }) => {
  const { t } = useTranslation();
  const [newPosId, setNewPosId] = useState('');

  const addPosId = () => {
    if (newPosId && !group.whiteList.includes(newPosId)) {
      onUpdate({
        whiteList: [...group.whiteList, newPosId]
      });
      setNewPosId('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="font-bold">{t('admin.whiteList', { name: group.title })}</h3>
        <div className="flex-1">
          <input
            value={newPosId}
            onChange={e => setNewPosId(e.target.value.toUpperCase())}
            placeholder={t('admin.posId')}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={addPosId}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <UserPlus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {group.whiteList.map(posId => (
          <div key={posId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>{posId}</span>
            <button
              onClick={() => onUpdate({
                whiteList: group.whiteList.filter(id => id !== posId)
              })}
              className="text-red-500 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const LevelEditor = ({ level, onChange, onDelete }) => {
  const { t } = useTranslation();
  
  const handleBonusChange = (bonuses) => {
    onChange({ ...level, bonuses });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-lg">{t('agent.currentLevel')} {level.id}</span>
          <input
            value={level.title}
            onChange={e => onChange({ ...level, title: e.target.value })}
            className="p-1 border rounded"
          />
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {['deposits', 'prepayments', 'users'].map(field => (
          <div key={field}>
            <label className="block text-sm mb-1">
              {t(`metrics.${field}`)}
            </label>
            <input
              value={level[field]}
              onChange={e => onChange({ ...level, [field]: e.target.value })}
              className="w-full p-1 border rounded"
              type="number"
            />
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-2">{t('agent.availableBonuses')}</h4>
        <BonusSelector 
          value={level.bonuses || []}
          onChange={handleBonusChange}
        />
      </div>
    </div>
  );
};

const NewGroupForm = ({ onAdd, onCancel }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = () => {
    if (title && id) {
      onAdd({
        id,
        title,
        levels: [],
        whiteList: []
      });
      setTitle('');
      setId('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="font-bold">{t('admin.addGroup')}</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder={t('admin.groupId')}
          className="p-2 border rounded"
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={t('admin.groupName')}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {t('common.cancel')}
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!title || !id}
        >
          {t('common.add')}
        </button>
      </div>
    </div>
  );
};

const AdminPanel = ({ groups, selectedGroupId, onGroupUpdate }) => {
  const { t } = useTranslation();
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editedGroupTitle, setEditedGroupTitle] = useState('');

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  const updateGroup = (newGroupData) => {
    const newGroups = groups.map(g => 
      g.id === selectedGroupId ? { ...g, ...newGroupData } : g
    );
    onGroupUpdate(newGroups);
  };

  const updateLevel = (levelIndex, newLevelData) => {
    const newLevels = [...selectedGroup.levels];
    newLevels[levelIndex] = newLevelData;
    updateGroup({ levels: newLevels });
  };

  const addLevel = () => {
    const newLevel = {
      id: (selectedGroup.levels.length + 1),
      title: `${t('agent.currentLevel')} ${selectedGroup.levels.length + 1}`,
      deposits: 0,
      prepayments: 0,
      users: 0,
      bonuses: []
    };
    updateGroup({ levels: [...selectedGroup.levels, newLevel] });
  };

  const deleteLevel = (index) => {
    const newLevels = selectedGroup.levels.filter((_, i) => i !== index);
    updateGroup({ levels: newLevels });
  };

  const deleteGroup = () => {
    if (groups.length <= 1) {
      alert(t('admin.cantDeleteLastGroup'));
      return;
    }
    const newGroups = groups.filter(g => g.id !== selectedGroupId);
    onGroupUpdate(newGroups, newGroups[0].id);
  };

  const addGroup = (newGroup) => {
    onGroupUpdate([...groups, newGroup], newGroup.id);
    setIsAddingGroup(false);
  };

  const saveGroupTitle = () => {
    if (editedGroupTitle) {
      const newGroups = groups.map(g => 
        g.id === editingGroupId ? { ...g, title: editedGroupTitle } : g
      );
      onGroupUpdate(newGroups);
    }
    setEditingGroupId(null);
    setEditedGroupTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LockKeyhole />
          <h2 className="text-xl font-bold">{t('admin.title')}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedGroupId}
            onChange={e => onGroupUpdate(groups, e.target.value)}
            className="p-2 border rounded"
          >
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.title}
              </option>
            ))}
          </select>
          <LanguageSwitch />
          {!isAddingGroup && (
            <button
              onClick={() => setIsAddingGroup(true)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {isAddingGroup && (
        <NewGroupForm 
          onAdd={addGroup}
          onCancel={() => setIsAddingGroup(false)}
        />
      )}

      <GroupHeader
        group={selectedGroup}
        isEditing={editingGroupId === selectedGroup.id}
        editedTitle={editedGroupTitle}
        onEdit={(title) => {
          setEditingGroupId(selectedGroup.id);
          setEditedGroupTitle(title);
        }}
        onSave={saveGroupTitle}
        onCancel={() => {
          setEditingGroupId(null);
          setEditedGroupTitle('');
        }}
        onDelete={deleteGroup}
      />

      <WhiteList 
        group={selectedGroup} 
        onUpdate={updateGroup} 
      />

      {selectedGroup.levels.map((level, i) => (
        <LevelEditor
          key={level.id}
          level={level}
          onChange={newData => updateLevel(i, newData)}
          onDelete={() => deleteLevel(i)}
        />
      ))}

      <button
        onClick={addLevel}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>{t('common.add')} {t('agent.currentLevel').toLowerCase()}</span>
      </button>
    </div>
  );
};

export default AdminPanel;