
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY ?? ''

// method for seting and getting data from localstorage secure way 
export const LocalStorageService = {
  setEncrypted: (key: string, value: unknown) => {
    try {
      const stringValue = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
      localStorage.setItem(key, encrypted);
    } catch (err) {
      console.error('Error encrypting data:', err);
    }
  },

  getDecrypted: <T = any>(key: string): T | null => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) return null;
      return JSON.parse(decrypted);
    } catch (err) {
      console.error('Error decrypting data:', err);
      return null;
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
