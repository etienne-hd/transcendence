import FriendNavCard from "./FriendNavCard";
import { useFriendFocused } from "../../context/FriendFocusedContext";
import { useLocation, useNavigate } from "react-router";
import { useLogin } from "../../context/LoginContext";
import SettingCard from "./SettingCard";
import { useFriends } from "../../context/FriendListContext";
import FriendMenu from "./FriendMenu";
import type { Friend } from "../../api/types/friend";

function Navbar() {
  const { friends } = useFriends();
  const { friendFocused, setFriendFocused } = useFriendFocused();
  const { loggedStatus } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const onClickFriend = (friend: Friend) => {
    if (!location.pathname.startsWith("/message/" + friend.user.id)) {
      navigate("/message/" + friend.user.id);
      setFriendFocused(friend);
    }
  };

  return (
    loggedStatus && (
      <div className="bg-bg-secondary p-4 flex flex-col w-90 gap-4">
        <FriendMenu />
        <div className="w-full px-2 h-full border-t-2 border-border-secondary py-2 flex flex-col gap-2 overflow-x-scroll">
          {friends.map((friend) => (
            <FriendNavCard
              friend={friend}
              key={friend.id}
              isFocus={friendFocused == friend}
              onClick={onClickFriend}
            />
          ))}
        </div>
        <SettingCard />
      </div>
    )
  );
}

export default Navbar;
