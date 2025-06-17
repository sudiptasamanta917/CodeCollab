import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Groups.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const Groups = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {

    fetchGroups();
    
  }, []);

  const fetchGroups = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    if (!userId) {
      console.error('User ID is not found in local storage');
      return;
    }
    try {
      const response = await axios.get(
          `${BACKEND_URL}/api/users/${userId}/groups`
      );
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      console.error('Group name cannot be empty');
      return;
    }

    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

    if (!userId) {
      console.error('User ID is not found in local storage');
      return;
    }
    
    try {
      await axios.post(`${BACKEND_URL}/api/creategroup`, { name: groupName, userId });
      setGroupName('');
      fetchGroups(); // Refresh the list of groups
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleGroupClick = (groupId) => {
    Navigate(`/groups/${groupId}`);
  };

  return (
      <div className="container">
          <p> + Create New Group</p>
          <div className="createGroup">
              <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Group Name"
              />
              <button onClick={handleCreateGroup}>Create</button>
          </div>
          <div>
              {groups.map((group) => (
                  <li key={group.id} onClick={() => handleGroupClick(group.id)} className='group'>
                      {group.name}{" "}
                  </li>
              ))}
          </div>
      </div>
  );
};
