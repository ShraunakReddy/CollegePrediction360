// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   isPremium: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   upgradeAccount: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);



// // Mock user data for demo purposes
// const MOCK_USERS = [
//   {
//     id: '1',
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'password123',
//     isPremium: false
//   }
// ];

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     // Check for saved user in localStorage
//     const savedUser = localStorage.getItem('cp360_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string): Promise<void> => {
//     setIsLoading(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
//     if (foundUser) {
//       const { password, ...userWithoutPassword } = foundUser;
//       setUser(userWithoutPassword);
//       localStorage.setItem('cp360_user', JSON.stringify(userWithoutPassword));
//     } else {
//       throw new Error('Invalid email or password');
//     }
    
//     setIsLoading(false);
//   };

//   const signup = async (name: string, email: string, password: string): Promise<void> => {
//     setIsLoading(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Check if user already exists
//     if (MOCK_USERS.some(u => u.email === email)) {
//       setIsLoading(false);
//       throw new Error('Email already in use');
//     }

//     // Create new user
//     const newUser = {
//       id: `${MOCK_USERS.length + 1}`,
//       name,
//       email,
//       password,
//       isPremium: false
//     };
    
//     // In a real app, we would send this to an API
//     MOCK_USERS.push(newUser);
    
//     // Set the newly created user as the current user
//     const { password: _, ...userWithoutPassword } = newUser;
//     setUser(userWithoutPassword);
//     localStorage.setItem('cp360_user', JSON.stringify(userWithoutPassword));
    
//     setIsLoading(false);
//   };

//   const logout = (): void => {
//     setUser(null);
//     localStorage.removeItem('cp360_user');
//   };

//   const upgradeAccount = (): void => {
//     if (user) {
//       const upgradedUser = { ...user, isPremium: true };
//       setUser(upgradedUser);
//       localStorage.setItem('cp360_user', JSON.stringify(upgradedUser));
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated: !!user,
//       isLoading,
//       login,
//       signup,
//       logout,
//       upgradeAccount
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// *****************//

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeAccount: () => void;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    isPremium: false
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('cp360_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('cp360_user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid email or password');
    }

    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (MOCK_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }

    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      password,
      isPremium: false
    };

    MOCK_USERS.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('cp360_user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('cp360_user');
  };

  const upgradeAccount = (): void => {
    if (user) {
      const upgradedUser = { ...user, isPremium: true };
      setUser(upgradedUser);
      localStorage.setItem('cp360_user', JSON.stringify(upgradedUser));
    }
  };

  const sendOtp = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:4000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error('Failed to send OTP', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) throw new Error('Invalid OTP');

      return true;
    } catch (error) {
      console.error('OTP verification failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      upgradeAccount,
      sendOtp,
      verifyOtp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
