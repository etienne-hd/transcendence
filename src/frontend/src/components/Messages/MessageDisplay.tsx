import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Message } from "../../api/types/message";
import { useUser } from "../../context/UserContext";
import { Download, DownloadIcon, Trash2 } from "lucide-react";
import { useMessage } from "../../context/MessageContext";
import { memo, useState } from "react";
import Avatar from "../Avatar";
import { button } from "framer-motion/client";

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

// TODO: si attachement == image -> preview avec un <img/>
const MessageDisplay = memo(function MessageDisplay(
  props: MessageDisplayProps,
) {
  const [downloadPercent, setDownloadPercent] = useState<number | undefined>(
    undefined,
  );

  const { user } = useUser();
  const { removeMessage, downloadAttachment } = useMessage();

  return (
    <div className="flex flex-row gap-4 p-2 pr-6 w-full justify-start items-start">
      <Avatar userId={props.message.from_user.id} className="h-12 w-12" />
      <div className="flex flex-col justify-center items-start w-full">
        <div className="flex flex-row gap-2 justify-center items-center ">
          <p className="font-semibold ">{props.message.from_user.username}</p>
          <p className="text-xs text-font-secondary">
            {formatMessageDate(props.message.created_at)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="w-full text-start break-all text-wrap">
            {props.message.content}
          </p>
          {props.message.attachment && (
            <button
              onClick={() => {
                if (downloadPercent == undefined) {
                  downloadAttachment(props.message.id, setDownloadPercent);
                }
              }}
              className="cursor-pointer p-1 px-2 border-border-secondary bg-bg-secondary border-2 rounded-full flex flex-row gap-2 text-xs justify-center items-center"
            >
              <DownloadIcon size={15} />
              <p>{props.message.attachment}</p>
              {downloadPercent != undefined && (
                <span className="w-20 h-2 bg-b bg-bg-tertiary rounded-full relative">
                  <span
                    className={
                      "bg-accent-primary h-full rounded-full absolute top-0 left-0"
                    }
                    style={{ width: downloadPercent + "%" }}
                  ></span>
                </span>
              )}
            </button>
          )}
        </div>
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
