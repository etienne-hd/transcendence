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
}

const LoggedStatusContext = createContext<LoggedStatusContextType | undefined>(
  undefined,
);

function LoginContext(props: LoginContextProps) {
  const [loggedStatus, setLoggedStatus] = useState<boolean>(false);

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

    initLoggedStatus();
  }, []);

  return (
    <LoggedStatusContext.Provider value={{ loggedStatus, setLoggedStatus }}>
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
