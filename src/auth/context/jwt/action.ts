'use client';

import type { Occupation } from 'src/components/user-auth/types';

import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  phone?: string;
  email?: string;
  password: string;
  auth_method: string;
};

export type SignUpParams = {
  role: string;
  email?: string;
  password: string;
  phone?: string;
  fio: string;
  code?: number;
  occupation: Occupation;
  code_hash?: string;
  auth_method: string;
  date_of_birth?: string | number;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({
  phone,
  email,
  password,
  auth_method,
}: SignInParams): Promise<void> => {
  try {
    const params = { phone, email, password, auth_method };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { access_token } = res.data.data;

    if (!access_token) {
      throw new Error('Access token not found in response');
    }

    setSession(access_token);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  fio,
  role = 'teacher',
  phone,
  code,
  code_hash,
  auth_method,
  occupation,
  date_of_birth,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    fio,
    role,
    phone,
    code,
    code_hash,
    occupation,
    auth_method,
    date_of_birth,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { access_token } = res.data.data;

    if (!access_token) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, access_token);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

export const otpEmailRequest = async (email?: string): Promise<string> => {
  try {
    const res = await axios.post(endpoints.auth.otpEmail, { email });
    const codeHash = res.data.data.code_hash;

    return codeHash;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
};
export const otpPhoneRequest = async (phone?: string): Promise<string> => {
  try {
    const res = await axios.post(endpoints.auth.otpPhone, { phone });
    const codeHash = res.data.data.code_hash;
    return codeHash;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
};
