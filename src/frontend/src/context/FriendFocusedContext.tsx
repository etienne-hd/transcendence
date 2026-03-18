import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Friend } from "../api/types/friend";
import { useSocket } from "./WebSocketContext";
import type { SocketCaller } from "../api/types/socketCaller";
import { useFriends } from "./FriendListContext";
import { useNavigate } from "react-router";

interface FriendFocusedContextType {
  friendFocused: Friend | undefined;
  setFriendFocused: (friend: Friend) => void;
}

interface FriendFocusedContextProviderProps {
  children: ReactNode;
}

const FriendFocusedContext = createContext<
  FriendFocusedContextType | undefined
>(undefined);

function FriendFocusedContextProvider(
  props: FriendFocusedContextProviderProps,
) {
  const [friendFocused, setFriendFocused] = useState<Friend | undefined>(
    undefined,
  );

  return (
    <FriendFocusedContext.Provider value={{ friendFocused, setFriendFocused }}>
      {props.children}
    </FriendFocusedContext.Provider>
  );
}

export const useFriendFocused = () => {
  const context = useContext(FriendFocusedContext);
  if (context === undefined) {
    throw new Error(
      "useFriendFocused must be used within a FriendFocusedContextProvider",
    );
  }
  return context;
};

export default FriendFocusedContextProvider;
