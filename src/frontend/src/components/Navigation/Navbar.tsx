import { useState } from "react";
import type { Friend } from "../../api/types/user";
import FriendNavCard from "./FriendNavCard";
import { useFriendFocused } from "../../context/FriendFocusedContext";
import { useLocation, useNavigate } from "react-router";
import { useLogin } from "../../context/LoginContext";

function Navbar() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      name: "test",
      id: 2,
      username: "test",
      biography: "fhdskjfkjs",
      avatar: "gdfhjs",
      created_at: "fds",
      last_seen_at: "fdhjks",
      active: true,
    },
    {
      name: "test",
      id: 3,
      username: "test",
      biography: "fhdskjfkjs",
      avatar: "gdfhjs",
      created_at: "fds",
      last_seen_at: "fdhjks",
      active: false,
    },
    {
      name: "test",
      id: 4,
      username: "test",
      biography: "fhdskjfkjs",
      avatar: "gdfhjs",
      created_at: "fds",
      last_seen_at: "fdhjks",
      active: false,
    },
  ]);

  const { friendFocused, setFriendFocused } = useFriendFocused();
  const { loggedStatus } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const onClickFriend = (id: number) => {
    setFriendFocused(id);
    if (!location.pathname.startsWith("/message")) {
      navigate("/message");
    }
  };

  return (
    loggedStatus && (
      <div className="bg-bg-secondary p-4 flex flex-col w-90 gap-4">
        <div className="w-[95%] py-2">
          <p>menu</p>
        </div>
        <div className="w-[95%] h-full border-t-2 border-border-secondary py-2 flex flex-col gap-2 overflow-x-scroll">
          {friends.map((friend) => (
            <FriendNavCard
              friend={friend}
              key={friend.id}
              isFocus={friendFocused == friend.id}
              onClick={onClickFriend}
            />
          ))}
        </div>
        <div className="w-[95%] py-2 border-t-2 border-border-secondary">
          <p>setting</p>
        </div>
      </div>
    )
  );
}

export default Navbar;
