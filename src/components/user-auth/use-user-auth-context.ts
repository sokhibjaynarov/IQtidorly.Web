'use client';

import { useContext } from 'react';

import { UserAuthContext } from './user-auth-provider';

// ----------------------------------------------------------------------

export function useUserAuthContext() {
  const context = useContext(UserAuthContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
}
