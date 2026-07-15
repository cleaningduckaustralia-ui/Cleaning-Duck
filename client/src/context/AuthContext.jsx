import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const initialState = { user: null, isAuthenticated: false, loading: true };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, loading: false };
    case 'LOADED':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Try to restore session
    api.get('/auth/me')
      .then(({ data }) => dispatch({ type: 'LOGIN_SUCCESS', payload: data.user }))
      .catch(() => dispatch({ type: 'LOADED' }));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
    return data.user;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (_) {}
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
