import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  hasFirebaseConfig
} from '../firebase.js';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  isAnonymous: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email?: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAnonymously: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pramana_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync Firebase Auth State
  useEffect(() => {
    if (!hasFirebaseConfig) return;

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const profile: UserProfile = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Academic Researcher',
          email: fbUser.email || 'researcher@pramana.ai',
          photoURL: fbUser.photoURL || undefined,
          isAnonymous: fbUser.isAnonymous
        };
        setUser(profile);
        localStorage.setItem('pramana_user', JSON.stringify(profile));
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (email?: string) => {
    const newUser: UserProfile = {
      uid: 'user-' + Date.now(),
      name: email ? email.split('@')[0] : 'Julian Researcher',
      email: email || 'researcher@pramana.ai',
      isAnonymous: false
    };
    setUser(newUser);
    localStorage.setItem('pramana_user', JSON.stringify(newUser));
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (hasFirebaseConfig) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const profile: UserProfile = {
        uid: res.user.uid,
        name: res.user.displayName || email.split('@')[0],
        email: res.user.email || email,
        isAnonymous: false
      };
      setUser(profile);
      localStorage.setItem('pramana_user', JSON.stringify(profile));
    } else {
      login(email);
    }
  };

  const signupWithEmail = async (name: string, email: string, password: string) => {
    if (hasFirebaseConfig) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const profile: UserProfile = {
        uid: res.user.uid,
        name: name || email.split('@')[0],
        email: res.user.email || email,
        isAnonymous: false
      };
      setUser(profile);
      localStorage.setItem('pramana_user', JSON.stringify(profile));
    } else {
      const newUser: UserProfile = {
        uid: 'user-' + Date.now(),
        name: name || email.split('@')[0],
        email,
        isAnonymous: false
      };
      setUser(newUser);
      localStorage.setItem('pramana_user', JSON.stringify(newUser));
    }
  };

  const loginWithGoogle = async () => {
    if (hasFirebaseConfig) {
      const res = await signInWithPopup(auth, googleProvider);
      const profile: UserProfile = {
        uid: res.user.uid,
        name: res.user.displayName || res.user.email?.split('@')[0] || 'Google Researcher',
        email: res.user.email || 'researcher.google@pramana.ai',
        photoURL: res.user.photoURL || undefined,
        isAnonymous: false
      };
      setUser(profile);
      localStorage.setItem('pramana_user', JSON.stringify(profile));
    } else {
      login('researcher.google@pramana.ai');
    }
  };

  const loginAnonymously = () => {
    const newUser: UserProfile = {
      uid: 'anon-' + Date.now(),
      name: 'Anonymous Researcher',
      email: 'anon@pramana.ai',
      isAnonymous: true
    };
    setUser(newUser);
    localStorage.setItem('pramana_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    if (hasFirebaseConfig) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Firebase logout notice:', err);
      }
    }
    setUser(null);
    localStorage.removeItem('pramana_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        loginAnonymously,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

