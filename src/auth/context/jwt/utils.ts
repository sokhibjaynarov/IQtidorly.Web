import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';

import { STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(access_token: string) {
  if (!access_token) {
    return false;
  }

  try {
    const decoded = jwtDecode(access_token);

    if (!decoded) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Token expired!');
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = paths.auth.jwt.signIn;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(access_token: string | null) {
  try {
    if (access_token) {
      sessionStorage.setItem(STORAGE_KEY, access_token);

      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      const decodedToken = jwtDecode(access_token);

      // ~3 days by minimals server

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp);
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
