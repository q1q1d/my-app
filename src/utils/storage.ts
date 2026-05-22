import { UserProfile } from '../types/index';

const STORAGE_KEY = 'digital_id_profile';
const AUTH_KEY = 'digital_id_auth';

export const StorageUtils = {
  // 프로필 저장
  saveProfile: (profile: UserProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  },

  // 프로필 조회
  getProfile: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get profile:', error);
      return null;
    }
  },

  // 프로필 삭제
  deleteProfile: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  },

  // 비밀번호 저장 (해시)
  setAuthPassword: (password: string): void => {
    try {
      const hashed = btoa(password); // 기본 인코딩 (실제로는 bcrypt 등 사용)
      localStorage.setItem(AUTH_KEY, hashed);
    } catch (error) {
      console.error('Failed to set password:', error);
    }
  },

  // 비밀번호 확인
  verifyPassword: (password: string): boolean => {
    try {
      const hashed = localStorage.getItem(AUTH_KEY);
      if (!hashed) return false;
      return btoa(password) === hashed;
    } catch (error) {
      console.error('Failed to verify password:', error);
      return false;
    }
  },

  // 인증 여부 확인
  hasAuth: (): boolean => {
    return localStorage.getItem(AUTH_KEY) !== null;
  },
};