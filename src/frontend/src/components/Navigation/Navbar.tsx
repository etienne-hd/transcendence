import { useState } from "react";
import FriendNavCard from "./FriendNavCard";
import { useFriendFocused } from "../../context/FriendFocusedContext";
import { useLocation, useNavigate } from "react-router";
import { useLogin } from "../../context/LoginContext";
import SettingCard from "./SettingCard";
import SettingsModal from "../Settings/SettingsModal";
import { useFriends } from "../../context/FriendListContext";

function Navbar() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const { friends } = useFriends();
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

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    loggedStatus && (
      <div className="bg-bg-secondary p-4 flex flex-col w-90 gap-4">
        {settingsOpen && <SettingsModal toggleSettings={toggleSettings} />}
        <div className="p-2">
          <p>menu</p>
        </div>
        <div className="w-full px-2 h-full border-t-2 border-border-secondary py-2 flex flex-col gap-2 overflow-x-scroll">
          {friends.map((friend) => (
            <FriendNavCard
              friend={friend}
              key={friend.id}
              isFocus={friendFocused == friend.id}
              onClick={onClickFriend}
            />
          ))}
        </div>
        <SettingCard toggleSetting={toggleSettings} />
      </div>
    )
  );
}

export default Navbar;
