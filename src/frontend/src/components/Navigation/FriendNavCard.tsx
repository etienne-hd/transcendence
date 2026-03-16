import { Check, X } from "lucide-react";
import type { Friend } from "../../api/types/friend";
import { useFriends } from "../../context/FriendListContext";
import Avatar from "../Avatar";

interface FriendNavCardProps {
  friend: Friend;
  onClick: (friend: Friend) => void;
  isFocus?: boolean;
}

// TODO : Loggin status variable
function FriendNavCard(props: FriendNavCardProps) {
  const { removeFriend, addFriend } = useFriends();

  return (
    <div
      className={
        "w-full h-12 flex-row flex gap-4 rounded-md hover:bg-bg-tertiary transition-all duration-75 active:scale-102 p-2 cursor-pointer " +
        (props.isFocus && "bg-bg-tertiary")
      }
      onClick={() => {
        props.onClick(props.friend);
      }}
    >
      <Avatar
        userId={props.friend.user.id}
        className="h-full w-auto"
        showStatus
      />
      <div className="w-full h-full flex flex-col items-start justify-center">
        <p className="font-semibold text-ellipsis">
          {props.friend.user.username}
        </p>
      </div>
      <div className="h-full flex flex-row justify-center items-center">
        {props.friend.status == "pending" && (
          <div
            onClick={(e) => {
              addFriend(props.friend.user.username);
              e.stopPropagation();
            }}
            className="h-full flex justify-center items-center hover:bg-black/20 rounded-full p-1 "
          >
            <Check color="var(--color-font-secondary)" size={18} />
          </div>
        )}
        <div
          onClick={(e) => {
            removeFriend(props.friend.user.username);
            e.stopPropagation();
          }}
          className="h-full flex justify-center items-center hover:bg-black/20 rounded-full p-1 "
        >
          <X color="var(--color-font-secondary)" size={18} />
        </div>
      </div>
    </div>
  );
}

export default FriendNavCard;
