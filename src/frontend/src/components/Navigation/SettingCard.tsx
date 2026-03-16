import { Settings } from "lucide-react";
import { useUser } from "../../context/UserContext";
import SettingsModal from "../Settings/SettingsModal";
import { useState } from "react";
import Avatar from "../Avatar";

function SettingCard() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const { user } = useUser();

  const isActive = true;

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
        <Avatar userId={user?.id} showStatus className="h-full " />
        <div className="w-full h-full flex flex-col items-start justify-center">
          <p className="font-semibold text-ellipsis">{user?.username}</p>
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
