import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Message } from "../../api/types/message";
import { useUser } from "../../context/UserContext";
import { Trash2 } from "lucide-react";
import { useMessage } from "../../context/MessageContext";
import { memo } from "react";

interface MessageDisplayProps {
  message: Message;
}

const formatMessageDate = (isoDate: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale("fr");

  const date = dayjs(isoDate);
  const now = dayjs();

  if (date.isSame(now, "day")) {
    return date.format("HH:mm");
  }

  return date.fromNow();
};

const MessageDisplay = memo(function MessageDisplay(
  props: MessageDisplayProps,
) {
  const { user } = useUser();
  const { removeMessage } = useMessage();

  return (
    <div className="flex flex-row gap-4 p-2 pr-6 w-full justify-start items-center">
      <img
        src={props.message.from_user.avatar}
        className="rounded-full w-12 h-12"
      />
      <div className="flex flex-col justify-center items-start w-full">
        <div className="flex flex-row gap-2 justify-center items-center ">
          <p className="font-semibold ">{props.message.from_user.username}</p>
          <p className="text-xs text-font-secondary">
            {formatMessageDate(props.message.created_at)}
          </p>
        </div>
        <p className="w-full text-start break-all text-wrap">
          {props.message.content}
        </p>
      </div>
      {user?.id == props.message.from_user.id ? (
        <button
          onClick={() => {
            removeMessage(props.message.id);
          }}
          className="hover:brightness-150 hover:scale-102 duration-200 cursor-pointer"
        >
          <Trash2 size={18} color="var(--color-font-secondary)" />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default MessageDisplay;
