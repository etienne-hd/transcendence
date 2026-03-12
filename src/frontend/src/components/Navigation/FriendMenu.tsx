import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import AddFriendModal from "../Friends/AddFriendModal";

function FriendMenu() {
  const [friendOpen, setFriendOpen] = useState<boolean>(false);

  const toggleFriend = () => {
    setFriendOpen(!friendOpen);
  };

  return (
    <>
      {friendOpen && (
        <AddFriendModal
          toggleFriend={() => {
            toggleFriend();
          }}
        />
      )}
      <div
        onClick={() => {
          toggleFriend();
        }}
        className="w-full h-12 flex-row flex gap-4 rounded-md hover:bg-bg-tertiary transition-all duration-75 active:scale-102 p-2 cursor-pointer "
      >
        <UserRoundPlus />
        <p className="font-semibold">Add Friends</p>
      </div>
    </>
  );
}

export default FriendMenu;
