import { Settings } from "lucide-react";
import { useUser } from "../../context/UserContext";
import SettingsModal from "../Settings/SettingsModal";
import { useState } from "react";
import Avatar from "../Avatar";

function SettingCard() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const { user } = useUser();

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      {settingsOpen && <SettingsModal toggleSettings={toggleSettings} />}
      <div
        className={
          "w-full h-15 flex-row flex gap-4 rounded-md bg-bg-tertiary shadow-xl p-2 px-4"
        }
      >
        <Avatar userId={user?.id} showStatus className="h-10 w-10 " />
        <div className="w-full min-w-0 h-full flex flex-col items-start justify-center">
          <p className="font-semibold truncate w-full">
            {user?.username}fdhkjshfkdshfsdhkf
          </p>
        </div>
        <button
          onClick={() => {
            toggleSettings();
          }}
          className="cursor-pointer h-full flex justify-end items-center hover:rotate-90 duration-200 transition-all"
        >
          <Settings color="var(--color-font-main)" />
        </button>
      </div>
    </>
  );
}

export default SettingCard;
