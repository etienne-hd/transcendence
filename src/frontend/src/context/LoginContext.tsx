import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { userService } from "../api/api.user";

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

//TODO: close le socket a la deconnection
function LoginContext(props: LoginContextProps) {
  const [loggedStatus, setLoggedStatus] = useState<boolean>(
    localStorage.getItem("accessToken") != undefined,
  );

  const logout = () => {
    setLoggedStatus(false);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const initLoggedStatus = async () => {
      await userService
        .me()
        .then(() => {
          setLoggedStatus(true);
        })
        .catch(() => {});
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
    throw new Error("useLogin must be used within a LoginContext");
  }
  return context;
};

export default LoginContext;
