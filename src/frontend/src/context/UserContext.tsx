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
  saveChange: (
    name: string | undefined,
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    biography: string | undefined,
    avatar: File | undefined,
    onSuccess: () => void,
  ) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserContextProvider(props: UserContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const { pushNotification } = useNotification();
  const { loggedStatus } = useLogin();

  const saveChange = async (
    name: string | undefined,
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    biography: string | undefined,
    avatar: File | undefined,
    onSuccess: () => void,
  ) => {
    if (
      name != undefined ||
      username != undefined ||
      email != undefined ||
      password != undefined ||
      biography != undefined ||
      avatar != undefined
    ) {
      try {
        const response = await userService.updateMe(
          email,
          username,
          name,
          password,
          biography,
          avatar,
        );

        setUser(response);
        pushNotification("Change saved", "valid");
        onSuccess();
        return true;
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          pushNotification(e.response.data.message, "error");
        }
        return false;
      }
    }
    return false;
  };

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

    if (loggedStatus) {
      getUser();
    }
  }, [loggedStatus, pushNotification]);

  return (
    <UserContext.Provider value={{ user, setUser, saveChange }}>
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
