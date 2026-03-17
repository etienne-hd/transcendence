import { useFriendFocused } from "../../context/FriendFocusedContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import FriendModal from "../Friends/FriendModal";
import Avatar from "../Avatar";
import { useMessage } from "../../context/MessageContext";
import { Link2, Link2Off, SortAsc, SortDesc, Unlink2 } from "lucide-react";

function MessageFriendInformation() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [sort, setSort] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [attachment, setAttachment] = useState<boolean | undefined>(undefined);

  const { friendFocused } = useFriendFocused();
  const { getMessage } = useMessage();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSort = () => {
    if (!sort || sort == "asc") {
      setSort("desc");
      getMessage("desc", search?.trim() != "" ? search : undefined, attachment);
    } else {
      setSort("asc");
      getMessage("asc", search?.trim() != "" ? search : undefined, attachment);
    }
  };

  const onLink = () => {
    if (!attachment) {
      setAttachment(true);
      getMessage(sort, search?.trim() != "" ? search : undefined, true);
    } else {
      setAttachment(undefined);
      getMessage(sort, search?.trim() != "" ? search : undefined, undefined);
    }
  };

  const onSearch = (value: string) => {
    getMessage(sort, value?.trim() != "" ? value : undefined, attachment);
  };

  dayjs.extend(relativeTime);
  dayjs.locale("fr");

  return (
    <>
      {isModalOpen && (
        <FriendModal friend={friendFocused} toggleFriendModal={toggleModal} />
      )}
      <div className="bg-bg-secondary flex flex-row justify-between items-center p-4">
        <div
          onClick={toggleModal}
          className="cursor-pointer flex flex-row gap-6 justify-center items-center"
        >
          <Avatar userId={friendFocused?.user.id} className="h-12 w-12" />
          <div className="flex flex-row gap-2 justify-center items-center">
            <h2 className="font-semibold text-xl">
              {friendFocused?.user.username}
            </h2>
            <h3 className="text-font-secondary">
              ({friendFocused?.user.name})
            </h3>
          </div>
        </div>

        <div className="flex flex-row h-full gap-4 justify-center items-center">
          <button
            onClick={() => {
              onLink();
            }}
            className="cursor-pointer "
          >
            {!attachment ? <Unlink2 /> : <Link2 />}
          </button>
          <button
            onClick={() => {
              onSort();
            }}
            className="cursor-pointer "
          >
            {!sort || sort == "asc" ? (
              <SortDesc />
            ) : (
              sort == "desc" && <SortAsc />
            )}
          </button>
          <input
            type="text"
            className={
              "border-2 p-1 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
            }
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            value={search}
          />
        </div>
      </div>
    </>
  );
}

export default MessageFriendInformation;
