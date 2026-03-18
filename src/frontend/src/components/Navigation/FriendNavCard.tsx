import { Check, X } from "lucide-react";
import type { Friend } from "../../api/types/friend";
import { useFriends } from "../../context/FriendListContext";
import Avatar from "../Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface FriendNavCardProps {
  friend: Friend;
  onClick: (friend: Friend) => void;
  isFocus?: boolean;
}

function FriendNavCard(props: FriendNavCardProps) {
  const { removeFriend, addFriend } = useFriends();

  dayjs.extend(relativeTime);
  dayjs.locale("fr");

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
        className="h-8 w-8"
        showStatus
        defaultStatus={props.friend.user.status == "online"}
      />
      <div className="w-full min-w-0 h-full flex flex-row items-center gap-2 justify-start">
        <p className="font-semibold truncate">{props.friend.user.name}</p>
        {props.friend.unread_messages != 0 && (
          <div className="bg-error rounded-full text-xs w-4 h-4 flex justify-center items-center">
            <p className="">{props.friend.unread_messages}</p>
          </div>
        )}
      </div>
      <div className="h-full flex flex-row justify-center items-center">
        {props.friend.status == "pending" && (
          <div
            onClick={(e) => {
              addFriend(props.friend.user.username);
              e.stopPropagation();
            }}
            className="h-full flex justify-center items-center hover:bg-black/20 rounded-full aspect-square p-1 "
          >
            <Check color="var(--color-font-secondary)" size={18} />
          </div>
        )}
        <div
          onClick={(e) => {
            removeFriend(props.friend.user.username);
            e.stopPropagation();
          }}
          className="h-full flex justify-center items-center hover:bg-black/20 rounded-full aspect-square p-1 "
        >
          <X color="var(--color-font-secondary)" size={18} />
        </div>
      </div>
    </div>
  );
}

export default FriendNavCard;
