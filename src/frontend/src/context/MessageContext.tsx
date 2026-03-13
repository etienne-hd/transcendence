import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Message } from "../api/types/message";
import { useLogin } from "./LoginContext";
import { useFriendFocused } from "./FriendFocusedContext";
import axios from "axios";
import { useNotification } from "./NotificationContext";
import { messageService } from "../api/api.message";
import { useUser } from "./UserContext";

interface MessageContextProviderProps {
  children: ReactNode;
}

interface MessageContextType {
  messages: Message[];
  getMessage: () => Promise<void>;
  pushMessage: (content: string) => Promise<boolean>;
  removeMessage: (messageId: number) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

function MessageContextProvider(props: MessageContextProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { logout } = useLogin();
  const { friendFocused } = useFriendFocused();
  const { user } = useUser();
  const { pushNotification } = useNotification();

  const getMessage = async () => {
    try {
      if (!friendFocused) {
        pushNotification(
          "Impossible to retrieve messages with this friend",
          "error",
        );
      } else {
        const response = await messageService.getMessage(
          friendFocused?.user.id,
        );

        setMessages(response);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.satusCode == 401) {
          logout();
        } else {
          pushNotification(e.response.data.message, "error");
        }
      }
    }
  };

  const pushMessage = async (content: string) => {
    try {
      if (!friendFocused?.user) {
        pushNotification(
          "Impossible to send message to invalid friend",
          "error",
        );
      } else {
        await messageService.sendMessage(friendFocused?.user.id, content);

        getMessage();
      }
      return true;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.satusCode == 401) {
          logout();
        } else {
          pushNotification(e.response.data.message, "error");
        }
      }
      return false;
    }
  };

  const removeMessage = async (messageId: number) => {
    try {
      if (!friendFocused?.user) {
        pushNotification(
          "Impossible to remove message with invalid friend",
          "error",
        );
      } else {
        await messageService.removeMessage(messageId);

        getMessage();
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.satusCode == 401) {
          logout();
        } else {
          pushNotification(e.response.data.message, "error");
        }
      }
    }
  };

  useEffect(() => {
    if (friendFocused?.user) {
      getMessage();
    }
  }, [friendFocused, user]);

  return (
    <MessageContext.Provider
      value={{ messages, getMessage, pushMessage, removeMessage }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un MessageContextProvider",
    );
  }
  return context;
};

export default MessageContextProvider;
