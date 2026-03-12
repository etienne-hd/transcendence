import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Friend } from "../api/types/user";
import axios from "axios";
import { useLogin } from "./LoginContext";
import { useNotification } from "./NotificationContext";

interface FriendListContextType {
  friends: Friend[];
  updateFriends: () => Promise<void>;
}

interface FriendListContextProviderProps {
  children: ReactNode;
}

const FriendListContext = createContext<FriendListContextType | undefined>(
  undefined,
);

function FriendListContextProvider(props: FriendListContextProviderProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { setLoggedStatus } = useLogin();
  const { pushNotification } = useNotification();

  // TODO : replace with api call
  const updateFriends = async () => {
    try {
      const response = [
        {
          name: "test",
          id: 2,
          username: "test",
          biography: "fhdskjfkjs",
          avatar: "gdfhjs",
          created_at: "fds",
          last_seen_at: "fdhjks",
          active: true,
        },
        {
          name: "test",
          id: 3,
          username: "test",
          biography: "fhdskjfkjs",
          avatar: "gdfhjs",
          created_at: "fds",
          last_seen_at: "fdhjks",
          active: false,
        },
        {
          name: "test",
          id: 4,
          username: "test",
          biography: "fhdskjfkjs",
          avatar: "gdfhjs",
          created_at: "fds",
          last_seen_at: "fdhjks",
          active: false,
        },
      ];
      setFriends(response);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status == 401) {
          setLoggedStatus(false);
        }
        pushNotification(e.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    updateFriends();
  }, []);

  return (
    <FriendListContext.Provider value={{ friends, updateFriends }}>
      {props.children}
    </FriendListContext.Provider>
  );
}

export const useFriends = () => {
  const context = useContext(FriendListContext);
  if (context === undefined) {
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un LoginContext",
    );
  }
  return context;
};

export default FriendListContextProvider;
