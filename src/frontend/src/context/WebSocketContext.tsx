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

  useEffect(() => {
    if (loggedStatus) {
      const socketio = io("http://localhost:3000", {
        transports: ["websocket"],
        auth: {
          token: localStorage.getItem("accessToken"),
        },
      });

      socketio.on("connect", () => console.log("Socket Connected"));
      socketio.on("connect_error", (err) =>
        console.log("Error with socket connexion:", err),
      );

      setSocket(socketio);

      return () => {
        socketio.disconnect();
      };
    }
  }, [loggedStatus]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

// TODO: Changer les message des hook des context pour matcher avec le context associer
export const useSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useLogin doit être utilisé à l'intérieur d'un LoginContext",
    );
  }
  return context;
};

export default WebSocketContextProvider;
