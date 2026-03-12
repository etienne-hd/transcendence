import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { useLogin } from "./LoginContext";
import { useNotification } from "./NotificationContext";
import { friendService } from "../api/api.friend";
import type { Friend } from "../api/types/friend";

interface FriendListContextType {
  friends: Friend[];
  updateFriends: () => Promise<void>;
  addFriend: (username: string) => Promise<void>;
  removeFriend: (username: string) => Promise<void>;
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

  const updateFriends = async () => {
    try {
      const response = await friendService.getFriends();
      setFriends(response);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.statusCode == 401) {
          setLoggedStatus(false);
        } else {
          pushNotification(e.response.data.message, "error");
        }
      }
    }
  };

  const addFriend = async (username: string) => {
    try {
      const response = await friendService.addFriend(username);

      pushNotification(response.message, "valid");
      updateFriends();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.statusCode == 401) {
          setLoggedStatus(false);
        } else {
          pushNotification(e.response.data, "error");
        }
      }
    }
  };

  const removeFriend = async (username: string) => {
    try {
      const response = await friendService.removeFriend(username);

      pushNotification(response.message, "valid");
      updateFriends();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.statusCode == 401) {
          setLoggedStatus(false);
        } else {
          pushNotification(e.response.data, "error");
        }
      }
    }
  };

  useEffect(() => {
    updateFriends();
  }, []);

  return (
    <FriendListContext.Provider
      value={{ friends, updateFriends, addFriend, removeFriend }}
    >
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
