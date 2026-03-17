import MessageFriendInformation from "../../components/Messages/MessageFriendInformation";
import MessageInput from "../../components/Messages/MessageInput";
import PageWrapper from "../../components/PageWrapper";
import { useMessage } from "../../context/MessageContext";
import MessageDisplay from "../../components/Messages/MessageDisplay";
import { Virtuoso } from "react-virtuoso";
import { useEffect } from "react";
import { useFriends } from "../../context/FriendListContext";
import { useNavigate, useParams } from "react-router";
import { useFriendFocused } from "../../context/FriendFocusedContext";
import { useSocket } from "../../context/WebSocketContext";
import type { SocketCaller } from "../../api/types/socketCaller";

function Conversation() {
  const { messages } = useMessage();
  const { friends } = useFriends();
  const { username } = useParams();
  const { setFriendFocused, friendFocused } = useFriendFocused();

  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("friend:update", (data: SocketCaller) => {
      if (data.id == friendFocused?.user.id) {
        const friend = friends.filter((friend) => friend.user.id == data.id);
        console.log(friend);
        if (friend.length != 0) {
          navigate(`/message/${friend[0].user.username}`);
        } else {
          navigate("/");
        }
      }
    });

    return () => {
      socket.off("friend:update");
    };
  }, [friends, navigate]);

  useEffect(() => {
    if (friends && friends.length != 0) {
      const friend = friends.filter(
        (friend) => friend.user.username == username,
      );

      if (friend.length != 0) {
        setFriendFocused(friend[0]);
      } else {
        navigate("/");
      }
    }
  }, [friends]);

  // TODO: Scroll to bottom on message send
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
