import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { userService } from "../api/api.user";
import axios from "axios";

interface LoginContextProps {
  children: ReactNode;
}

interface LoggedStatusContextType {
  loggedStatus: boolean;
  setLoggedStatus: (status: boolean) => void;
  logout: () => void;
}

const LoggedStatusContext = createContext<LoggedStatusContextType | undefined>(
  undefined,
);

function LoginContext(props: LoginContextProps) {
  const [loggedStatus, setLoggedStatus] = useState<boolean>(false);

  const logout = () => {
    setLoggedStatus(false);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const initLoggedStatus = async () => {
      try {
        await userService.me();
        setLoggedStatus(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.data.statusCode != 401) {
            console.error("Erreur API:", error.response.data);
          }
        }
      }
    };

    if (localStorage.getItem("accessToken")) {
      initLoggedStatus();
    }
  }, []);

  return (
    <LoggedStatusContext.Provider
      value={{ loggedStatus, setLoggedStatus, logout }}
    >
      {props.children}
    </LoggedStatusContext.Provider>
  );
}

export const useLogin = () => {
  const context = useContext(LoggedStatusContext);
  if (context === undefined) {
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un LoginContext",
    );
  }
  return context;
};

export default LoginContext;
