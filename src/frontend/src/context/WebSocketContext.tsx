import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import { useLogin } from "./LoginContext";

interface WebSocketContextProviderProps {
  children: ReactNode;
}

interface WebSocketContextType {
  socket: Socket | undefined;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

function WebSocketContextProvider(props: WebSocketContextProviderProps) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedStatus } = useLogin();

  const initSocket = () => {
    if (loggedStatus) {
      const socketio = io("/", {
        path: "/api/socket.io",
        transports: ["websocket"],
        auth: {
          token: localStorage.getItem("accessToken"),
        },
        reconnection: true,
      });

      socketio.on("connect", () => {});
      socketio.on("connect_error", () => {});

      setSocket(socketio);
    }
  };

  useEffect(() => {
    initSocket();
    return () => {
      socket?.disconnect();
    };
  }, [loggedStatus]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a WebSocketContextProvider");
  }
  return context;
};

export default WebSocketContextProvider;
