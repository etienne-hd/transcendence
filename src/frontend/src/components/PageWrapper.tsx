import { useEffect, type ReactNode } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router";
import { useNotification } from "../context/NotificationContext";
import NotificationStack from "./Notification/NotificationStack";

interface PageWrapperProps {
  children?: ReactNode;
  className?: string;
  needLog: boolean;
  redirectNoLog?: string;
  redirectLog?: string;
}

function PageWrapper(props: PageWrapperProps) {
  const { loggedStatus } = useLogin();
  const naviagate = useNavigate();
  const { notifications } = useNotification();

  useEffect(() => {
    console.log("test");
    if (loggedStatus && props.redirectLog) {
      naviagate(props.redirectLog);
    } else if (!loggedStatus && props.redirectNoLog) {
      naviagate(props.redirectNoLog);
    }
  }, [loggedStatus, props, naviagate]);

  // TODO: Loading screen if needLog while not logged
  return (
    <>
      <NotificationStack notifications={notifications} />
      {(props.needLog && loggedStatus) || !props.needLog ? (
        <div
          className={
            "bg-bg-main text-font-main w-full h-full flex flex-col " +
            (props.className ? props.className : "")
          }
        >
          {props.children}
        </div>
      ) : (
        <p>test</p>
      )}
    </>
  );
}

export default PageWrapper;
