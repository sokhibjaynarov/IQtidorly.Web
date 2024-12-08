'use client';

import { useMemo, useState, createContext } from 'react';

import type { UserInfo, UserAuthContextValue } from './types';

type Props = {
  children: React.ReactNode;
};

export const UserAuthContext = createContext<UserAuthContextValue | undefined>(undefined);

export const UserAuthConsumer = UserAuthContext.Consumer;

export const UserAuthProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo]);

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};
