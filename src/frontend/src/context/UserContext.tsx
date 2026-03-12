import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User } from "../api/types/user";
import { userService } from "../api/api.user";
import axios from "axios";
import { useNotification } from "./NotificationContext";
import { useLogin } from "./LoginContext";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | undefined;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserContextProvider(props: UserContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { pushNotification } = useNotification();
  const { loggedStatus } = useLogin();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userService.me();

        setUser(response);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status != 401
        ) {
          pushNotification(err.response.data.message, "error");
        }
      }
    };

    getUser();
  }, [loggedStatus, pushNotification]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un LoginContext",
    );
  }
  return context;
};

export default UserContextProvider;
