import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface NotificationContextProps {
  children: ReactNode;
}

export interface NotificationItemContent {
  id: number;
  type: "error" | "notif" | "valid";
  message: string;
}

interface NotificationsContextTypes {
  notifications: NotificationItemContent[];
  pushNotification: (
    message: string,
    type: "error" | "notif" | "valid",
  ) => void;
}

const NotificationsContext = createContext<
  NotificationsContextTypes | undefined
>(undefined);

function NotificationContextProvider(props: NotificationContextProps) {
  const [notifications, setNotifications] = useState<NotificationItemContent[]>(
    [],
  );

  const pushNotification = useCallback(
    (message: string, type: "error" | "notif" | "valid") => {
      const id = Date.now();

      setNotifications((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((err) => err.id != id));
      }, 5000);
    },
    [],
  );

  return (
    <NotificationsContext.Provider value={{ notifications, pushNotification }}>
      {props.children}
    </NotificationsContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationContextProvider",
    );
  }
  return context;
};

export default NotificationContextProvider;
