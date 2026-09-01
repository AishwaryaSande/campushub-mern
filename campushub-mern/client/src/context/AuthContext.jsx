import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('ch_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ch_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('ch_token', data.token);
    localStorage.setItem('ch_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ch_token');
    localStorage.removeItem('ch_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
