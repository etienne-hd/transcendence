import type { Friend } from "../../api/types/friend";

interface FriendNavCardProps {
  friend: Friend;
  onClick: (id: number) => void;
  isFocus?: boolean;
}

// TODO : Loggin status variable
function FriendNavCard(props: FriendNavCardProps) {
  return (
    <div
      className={
        "w-full h-12 flex-row flex gap-4 rounded-md hover:bg-bg-tertiary transition-all duration-75 active:scale-102 p-2 cursor-pointer " +
        (props.isFocus && "bg-bg-tertiary")
      }
      onClick={() => {
        props.onClick(props.friend.id);
      }}
    >
      <div className="relative h-full">
        <img src={props.friend.user.avatar} className="rounded-full h-full" />
        <div
          className={
            "absolute bottom-0 right-0 w-2 h-2 rounded-full " +
            (props.friend.user.id ? "bg-green-500" : "bg-error")
          }
        ></div>
      </div>
      <div className="w-full h-full flex flex-col items-start justify-center">
        <p className="font-semibold text-ellipsis">
          {props.friend.user.username}
        </p>
      </div>
    </div>
  );
}

export default FriendNavCard;
