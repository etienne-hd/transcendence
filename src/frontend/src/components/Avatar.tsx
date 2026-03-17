import { memo, useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { useSocket } from "../context/WebSocketContext";
import type { SocketCaller } from "../api/types/socketCaller";

interface AvatarProps {
  userId: number | undefined;
  className?: string;
  showStatus?: boolean;
}

const Avatar = memo((props: AvatarProps) => {
  const [logged, setLogged] = useState<boolean>(false);
  const avatarRef = useRef<HTMLImageElement>(null);
  const { loadAvatar } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (avatarRef.current && props.userId) {
      loadAvatar(props.userId, avatarRef.current);
    }
  }, [props.userId, avatarRef, loadAvatar]);

  //TODO: trouver un moyen pour savoir si il est log au montage
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
          ref={avatarRef}
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
