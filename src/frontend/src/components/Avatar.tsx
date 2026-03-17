import { memo, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";

interface AvatarProps {
  userId: number | undefined;
  className?: string;
  showStatus?: boolean;
}

const Avatar = memo((props: AvatarProps) => {
  const logged = true;
  const avatarRef = useRef<HTMLImageElement>(null);
  const { loadAvatar } = useUser();

  useEffect(() => {
    if (avatarRef.current && props.userId) {
      loadAvatar(props.userId, avatarRef.current);
    }
  }, [props.userId, avatarRef, loadAvatar]);

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
