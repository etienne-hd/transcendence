import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
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

interface MessageContextProviderProps {
  children: ReactNode;
}

interface MessageContextType {
  messages: Message[];
  getMessage: () => Promise<void>;
  pushMessage: (
    content: string,
    attachment: File | undefined,
  ) => Promise<boolean>;
  removeMessage: (messageId: number) => Promise<void>;
  downloadAttachment: (
    messageId: number,
    onProgress: (percent: number | undefined) => void,
  ) => Promise<void>;
  loadAttachment: (
    messageId: number,
    imgRef: HTMLImageElement,
  ) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

function MessageContextProvider(props: MessageContextProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { logout } = useLogin();
  const { friendFocused } = useFriendFocused();
  const { user } = useUser();
  const { pushNotification } = useNotification();
  const { socket } = useSocket();

  // TODO: Mark all message as readed when retreived

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
        pushNotification(
          "Impossible to send message to invalid friend",
          "error",
        );
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

  const loadAttachment = async (
    messageId: number,
    imageRef: HTMLImageElement,
  ) => {
    try {
      if (imageRef != null) {
        await messageService.loadAttachement(messageId, imageRef);
      }
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

  useEffect(() => {
    if (friendFocused?.user) {
      getMessage();
    }
  }, [friendFocused, user]);

  useEffect(() => {
    socket?.on("message:new", (data: SocketCaller) => {
      if (data.id == friendFocused?.user.id) {
        getMessage();
      }
    });
  });

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
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un MessageContextProvider",
    );
  }
  return context;
};

export default MessageContextProvider;
