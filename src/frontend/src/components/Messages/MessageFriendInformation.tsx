import { useFriendFocused } from "../../context/FriendFocusedContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function MessageFriendInformation() {
  const { friendFocused } = useFriendFocused();

  dayjs.extend(relativeTime);
  dayjs.locale("fr");

  return (
    <div className="bg-bg-secondary flex flex-row justify-between items-center p-4">
      <div className="flex flex-row gap-6 justify-center items-center">
        <img
          src={
            friendFocused?.user.avatar
              ? friendFocused.user.avatar
              : "placeholder"
          }
          className="rounded-full h-12"
        />
        <div className="flex flex-row gap-2 justify-center items-center">
          <h2 className="font-semibold text-xl">
            {friendFocused?.user.username}
          </h2>
          <h3 className="text-font-secondary">({friendFocused?.user.name})</h3>
        </div>
      </div>

      {friendFocused?.status == "friend" && (
        <div>
          <p>Relationship time</p>
          <p className="font-semibold">
            {friendFocused?.status == "friend" &&
              dayjs(friendFocused?.friend_at).fromNow().replace("ago", "")}
          </p>
        </div>
      )}
    </div>
  );
}

export default MessageFriendInformation;
