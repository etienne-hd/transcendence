import dayjs from "dayjs";
import Modal from "../Modal";
import FriendModalInformation from "./FriendModalInformation";
import type { Friend } from "../../api/types/friend";
import Avatar from "../Avatar";

interface FriendModalProps {
  friend: Friend | undefined;
  toggleFriendModal: () => void;
}

function FriendModal(props: FriendModalProps) {
  return (
    <Modal toggleModal={props.toggleFriendModal}>
      <div className="bg-bg-secondary flex flex-col gap-6 justify-center items-center rounded-lg p-4 w-full">
        <div className="flex flex-row gap-6 justify-between p-4 items-center w-full">
          <div className="flex flex-row gap-6 justify-center items-center">
            <Avatar userId={props.friend?.user.id} className="h-20 w-20" />
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl font-semibold">
                {props.friend?.user?.username}
              </h1>
              <h2 className="text-md text-font-secondary">
                {props.friend?.user?.name}
              </h2>
            </div>
          </div>
          <div className="w-1/2 h-full bg-bg-tertiary rounded-md flex p-2 flex-col gap-2 justify-center items-start">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="font-semibold">Biography</p>
            </div>
            <p
              className={
                "border-2 p-1 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
              }
            >
              {props.friend?.user.biography != ""
                ? props.friend?.user.biography
                : "No biography for this user"}
            </p>
          </div>
        </div>
        <div className="w-[90%] h-1 bg-bg-tertiary rounded-full" />
        <div className="flex flex-row gap-6 w-full justify-center items-center">
          <FriendModalInformation
            label="name"
            value={props.friend?.user?.name}
          />
          <FriendModalInformation
            label="username"
            value={props.friend?.user?.username}
          />
        </div>
        <div className="w-[90%] h-1 bg-bg-tertiary rounded-full" />
        <div className="flex flex-row gap-6 w-full justify-center items-center">
          <FriendModalInformation
            label="Asked to be friend from"
            value={dayjs(props.friend?.created_at).format("DD MMMM YYYY")}
          />
          <FriendModalInformation
            label="friend from"
            value={dayjs(props.friend?.friend_at).format("DD MMMM YYYY")}
          />
        </div>
      </div>
    </Modal>
  );
}

export default FriendModal;
