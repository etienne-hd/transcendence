import FriendNavCard from "./FriendNavCard";
import { useFriendFocused } from "../../context/FriendFocusedContext";
import { useLocation, useNavigate } from "react-router";
import { useLogin } from "../../context/LoginContext";
import SettingCard from "./SettingCard";
import { useFriends } from "../../context/FriendListContext";
import FriendMenu from "./FriendMenu";
import type { Friend } from "../../api/types/friend";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

function Navbar() {
  const { friends } = useFriends();
  const { friendFocused, setFriendFocused } = useFriendFocused();
  const { loggedStatus } = useLogin();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onClickFriend = (friend: Friend) => {
    if (!location.pathname.startsWith("/message/" + friend.user.id)) {
      friend.unread_messages = 0;
      navigate("/message/" + friend.user.id);
      setFriendFocused(friend);
    }
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  if (!loggedStatus) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 left-3 z-50 p-2 rounded-lg bg-bg-secondary border border-border-secondary hover:bg-bg-tertiary transition-all duration-200 cursor-pointer touch-manipulation"
        title={isOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
      >
        {isOpen ? <PanelLeftClose size={20} className="sm:w-5 sm:h-5 w-6 h-6" /> : <PanelLeftOpen size={20} className="sm:w-5 sm:h-5 w-6 h-6" />}
      </button>

      <div
        className={
          "bg-bg-secondary flex flex-col overflow-hidden transition-all duration-300 shrink-0 " +
          (isOpen
            ? "fixed sm:relative inset-0 sm:inset-auto w-full sm:w-90 z-40"
            : "w-0")
        }
      >
        <div className="w-full sm:w-90 p-4 flex flex-col gap-4 h-full">
          <div className="pt-14">
            <FriendMenu />
          </div>
          <div className="w-full px-2 h-full border-t-2 border-border-secondary py-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
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
      </div>
    </>
  );
}

export default Navbar;
