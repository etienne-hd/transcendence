import PageWrapper from "../../components/PageWrapper";
import { useFriendFocused } from "../../context/FriendFocusedContext";

function Conversation() {
  const { friendFocused } = useFriendFocused();

  return (
    <>
      <PageWrapper
        className="justify-center items-center"
        needLog={true}
        redirectNoLog="/auth"
      >
        <p>{friendFocused}</p>
      </PageWrapper>
    </>
  );
}

export default Conversation;
