import { memo, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useSocket } from "../context/WebSocketContext";
import type { SocketCaller } from "../api/types/socketCaller";

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
      try {
        if (props.userId) {
          const blob = await loadAvatar(props.userId);

          if (blob) {
            objectUrl = URL.createObjectURL(blob);
            setAvatarUrl(objectUrl);
          }
        }
      } catch (err) {
        console.error("Erreur avatar", err);
      }
    };

    runLoad();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [props.userId]);

  useEffect(() => {
    if (props.showStatus) {
      socket?.on("friend:online", (data: SocketCaller) => {
        if (data.id == props.userId) {
          setLogged(true);
        }
      });

      socket?.on("friend:offline", (data: SocketCaller) => {
        if (data.id == props.userId) {
          setLogged(false);
        }
      });
    }
  });

  return (
    <>
      <div className={"relative aspect-square " + props.className}>
        <img
          src={avatarUrl}
          className={"rounded-full relative h-full w-full object-cover"}
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
