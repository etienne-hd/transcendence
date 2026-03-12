import { Settings } from "lucide-react";
import { useUser } from "../../context/UserContextProvider";

interface SettingCardProps {
  toggleSetting: () => void;
}

function SettingCard(props: SettingCardProps) {
  const { user } = useUser();

  const isActive = true;

  return (
    <div
      className={
        "w-full h-15 flex-row flex gap-4 rounded-md bg-bg-tertiary shadow-xl p-2 px-4"
      }
    >
      <div className="relative h-full">
        <img
          src={user?.avatar ? user.avatar : "placeholder"}
          className="rounded-full h-full"
        />
        <div
          className={
            "absolute bottom-0 right-0 w-2 h-2 rounded-full " +
            (isActive ? "bg-green-500" : "bg-error")
          }
        ></div>
      </div>
      <div className="w-full h-full flex flex-col items-start justify-center">
        <p className="font-semibold text-ellipsis">{user?.username}</p>
      </div>
      <button
        onClick={() => {
          props.toggleSetting();
        }}
        className="cursor-pointer h-full flex justify-end items-center hover:rotate-90 duration-200 transition-all"
      >
        <Settings color="var(--color-font-main)" />
      </button>
    </div>
  );
}

export default SettingCard;
