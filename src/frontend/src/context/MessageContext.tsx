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
import { useSocket } from "./WebSocketContext";
import type { SocketCaller } from "../api/types/socketCaller";
import { useFriends } from "./FriendListContext";

interface MessageContextProviderProps {
  children: ReactNode;
}

interface MessageContextType {
  messages: Message[];
  getMessage: (
    sort?: string,
    search?: string,
    attachment?: boolean,
  ) => Promise<void>;
  pushMessage: (
    content: string,
    attachment: File | undefined,
  ) => Promise<boolean>;
  removeMessage: (messageId: number) => Promise<void>;
  downloadAttachment: (
    messageId: number,
    onProgress: (percent: number | undefined) => void,
  ) => Promise<void>;
  loadAttachment: (messageId: number) => Promise<Blob | undefined>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

function MessageContextProvider(props: MessageContextProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { logout } = useLogin();
  const { friendFocused } = useFriendFocused();
  const { user } = useUser();
  const { pushNotification } = useNotification();
  const { socket } = useSocket();
  const { updateFriends } = useFriends();

  const getMessage = async (
    sort?: string,
    search?: string,
    attachment?: boolean,
  ) => {
    try {
      if (!friendFocused) {
        pushNotification(
          "Impossible to retrieve messages with this friend",
          "error",
        );
      } else {
        const response = await messageService.getMessage(
          friendFocused?.user.id,
          sort,
          search,
          attachment,
        );

        setMessages(response);

        await messageService.markReadAll(friendFocused.user.id);
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

  const pushMessage = async (content: string, attachment: File | undefined) => {
    try {
      if (!friendFocused?.user) {
        pushNotification("Unable to send message to invalid friend", "error");
      } else {
        await messageService.sendMessage(
          friendFocused?.user.id,
          content,
          attachment,
        );

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
          "Unable to remove message with invalid friend",
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

  const downloadAttachment = async (
    messageId: number,
    onProgress: (percent: number | undefined) => void,
  ) => {
    try {
      await messageService.downloadAttachement(messageId, onProgress);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.StatusCode == 401) {
          logout();
        } else {
          pushNotification(e.response.data.message, "error");
        }
      }
    }
  };

  const loadAttachment = async (messageId: number) => {
    try {
      const response = await messageService.loadAttachement(messageId);
      return response;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.data.StatusCode == 401) {
          logout();
        } else {
          pushNotification(e.message, "error");
        }
      }
    }
  };

  useEffect(() => {
    if (friendFocused?.user) {
      getMessage();
    }
  }, [friendFocused, user]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data: SocketCaller) => {
      if (data.id === friendFocused?.user.id) {
        getMessage();
      } else {
        updateFriends();
      }
    };

    const handleDeleteMessage = (data: SocketCaller) => {
      if (data.id === friendFocused?.user.id) {
        getMessage();
      }
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:delete", handleDeleteMessage);

    return () => {
      socket.off("message:new");
      socket.off("message:delete");
    };
  }, [socket, friendFocused]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessage,
        pushMessage,
        removeMessage,
        downloadAttachment,
        loadAttachment,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageContextProvider");
  }
  return context;
};

export default MessageContextProvider;
