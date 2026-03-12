import { createContext, useContext, useState, type ReactNode } from "react";

interface FriendFocusedContextType {
  friendFocused: number | undefined;
  setFriendFocused: (id: number) => void;
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
  const [friendFocused, setFriendFocused] = useState<number | undefined>(
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
      "useLogin doit être utilisé à l'intérieur d'un LoginContext",
    );
  }
  return context;
};

export default FriendFocusedContextProvider;
