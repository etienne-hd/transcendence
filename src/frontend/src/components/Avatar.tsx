import { memo, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useSocket } from "../context/WebSocketContext";

interface AvatarProps {
  userId: number | undefined;
  className?: string;
  showStatus?: boolean;
  defaultStatus?: boolean;
}

const Avatar = memo((props: AvatarProps) => {
  const [logged, setLogged] = useState<boolean>(
    props.defaultStatus ? props.defaultStatus : false,
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const { loadAvatar } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    let objectUrl: string | null = null;

    const runLoad = async () => {
      if (props.userId) {
        await loadAvatar(props.userId).then((blob) => {
          if (blob) {
            objectUrl = URL.createObjectURL(blob);
            setAvatarUrl(objectUrl);
          }
        });
      }
    };

    runLoad();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [props.userId]);

  useEffect(() => {
    if (props.showStatus) {
      const handleOnline = (data: { id: number }) => {
        if (data.id === props.userId) setLogged(true);
      };
      const handleOffline = (data: { id: number }) => {
        if (data.id === props.userId) setLogged(false);
      };

      socket?.on("friend:online", handleOnline);
      socket?.on("friend:offline", handleOffline);

      return () => {
        socket?.off("friend:online", handleOnline);
        socket?.off("friend:offline", handleOffline);
      };
    }
  });
  return (
    <>
      <div className={"relative aspect-square " + props.className}>
        <img
          src={avatarUrl}
          decoding="async"
          className={
            "rounded-full h-full w-full object-cover " +
            (props.showStatus && "relative")
          }
        />
        {props.showStatus && (
          <div
            className={
              "absolute bottom-0 right-0 w-2 h-2 rounded-full " +
              (logged ? "bg-green-500" : "bg-error")
            }
          ></div>
        )}
      </div>
    </>
  );
});

export default Avatar;
