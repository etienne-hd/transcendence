import { useEffect, useRef } from "react";
import MessageFriendInformation from "../../components/Messages/MessageFriendInformation";
import MessageInput from "../../components/Messages/MessageInput";
import PageWrapper from "../../components/PageWrapper";
import { useMessage } from "../../context/MessageContext";
import MessageDisplay from "../../components/Messages/MessageDisplay";

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
          <div
            ref={scrollMessageRef}
            className="overflow-y-scroll flex flex-col h-full justify-center items-end"
          >
            {messages.map((message, index) => (
              <MessageDisplay message={message} key={index} />
            ))}
          </div>
          <MessageInput />
        </div>
      </PageWrapper>
    </>
  );
}

export default Conversation;
