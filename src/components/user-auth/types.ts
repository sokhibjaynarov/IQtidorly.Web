export interface Occupation {
  type: string;
}

export type UserInfo = {
  role: string;
  auth_method: string;
  password: string;
  email?: string;
  phone?: string;
  fio: string;
  date_of_birth?: string | number;
  code_hash?: any;
  occupation: Occupation;
};

export type UserAuthContextValue = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};
