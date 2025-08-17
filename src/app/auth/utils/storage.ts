import { TOKEN_KEY } from '.';

export const storeToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const deleteStorageByKey = (key: string): void => {
  localStorage.removeItem(key);
};
