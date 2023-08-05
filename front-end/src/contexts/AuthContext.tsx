import React, { createContext, useContext, useState, useEffect } from "react";
import axios, { isAxiosError } from "@/stores/axios";

interface UserInfo {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isLogin: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  async function login(email: string, password: string) {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const userData = response.data.payload.data;

      store(userData);

      setUserInfo(userData);
      setIsLogin(true);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: AxiosErrorType = { ...error.response?.data };
        throw errorMessage.payload.errorMessage;
      }
    }
  }

  async function logout() {
    try {
      await axios.delete("/api/auth/logout");
      store(null);

      setUserInfo(null);
      setIsLogin(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: AxiosErrorType = { ...error.response?.data };
        throw errorMessage.payload.errorMessage;
      }
    }
  }

  function store(params: UserInfo | null) {
    sessionStorage.setItem("auth", JSON.stringify(params));
  }

  function get() {
    const auth = sessionStorage.getItem("auth");
    if (auth !== null)
      setUserInfo(JSON.parse(auth) as UserInfo), setIsLogin(true);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
