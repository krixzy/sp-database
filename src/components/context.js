"use client"

import React, { createContext, useContext, useState } from 'react';
import User from '../lib/User';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialiser User-klassen med nogle standardværdier
  const user = useState(new User('defaultUserId', 'defaultEmail@example.com'));
 console.log(user)
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
