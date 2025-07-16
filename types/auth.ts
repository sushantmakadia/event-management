export interface User {
    username: string;
    password: string;
  }

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
}