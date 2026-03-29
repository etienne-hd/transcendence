import { useEffect, useState } from "react";
import { useFriends } from "../../context/FriendListContext";
import Modal from "../Modal";

interface AddFriendModalProps {
  toggleFriend: () => void;
}

function AddFriendModal(props: AddFriendModalProps) {
  const [friend, setFriend] = useState<string | undefined>(undefined);

  const { addFriend } = useFriends();

  const onSubmit = () => {
    if (friend != undefined) {
      addFriend(friend)
        .then((success) => {
          if (success) {
            props.toggleFriend();
          }
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Modal
      toggleModal={() => {
        props.toggleFriend();
      }}
    >
      <div className="bg-bg-secondary flex flex-row gap-6 justify-between items-center rounded-lg p-4 w-full">
        <p className="font-bold w-full">Enter the username of your friend</p>
        <input
          type="text"
          placeholder="Jean"
          className={
            "border-2 p-2 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
          }
          onChange={(e) => {
            setFriend(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row gap-3 justify-end items-center">
        <button
          onClick={props.toggleFriend}
          className="px-4 py-1.5 rounded-lg border border-error/40 text-error text-sm font-medium hover:bg-error/10 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={friend == undefined || friend == ""}
          className="px-4 py-1.5 rounded-lg bg-accent-primary text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          Add friend
        </button>
      </div>
    </Modal>
  );
}

export default AddFriendModal;
