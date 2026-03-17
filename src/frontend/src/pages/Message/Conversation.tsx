import { useEffect, useRef } from "react";
import MessageFriendInformation from "../../components/Messages/MessageFriendInformation";
import MessageInput from "../../components/Messages/MessageInput";
import PageWrapper from "../../components/PageWrapper";
import { useMessage } from "../../context/MessageContext";
import MessageDisplay from "../../components/Messages/MessageDisplay";
import { Virtuoso } from "react-virtuoso";

// TODO: sort les messages
function Conversation() {
  const { messages } = useMessage();

  const scrollMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollMessageRef.current) {
      scrollMessageRef.current.scrollTop =
        scrollMessageRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <PageWrapper
        className="justify-center items-center"
        needLog={true}
        redirectNoLog="/auth"
      >
        <div className="flex flex-col h-full w-full">
          <MessageFriendInformation />
          <div className="flex-1 overflow-hidden">
            <Virtuoso
              data={messages}
              className="h-full w-full"
              itemContent={(index, message) => (
                <MessageDisplay message={message} />
              )}
              initialTopMostItemIndex={messages.length - 1}
              followOutput="smooth"
            />
          </div>
          <MessageInput />
        </div>
      </PageWrapper>
    </>
  );
}

export default Conversation;
