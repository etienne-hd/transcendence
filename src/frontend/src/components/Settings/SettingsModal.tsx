import { useUser } from "../../context/UserContext";
import { useEffect, useRef, useState } from "react";
import UserInformation from "./UserInformation";
import Modal from "../Modal";
import { useLogin } from "../../context/LoginContext";
import { Edit2, Eye, EyeClosed, LogOut, Trash2 } from "lucide-react";
import Avatar from "../Avatar";

interface SettingsModalProps {
  toggleSettings: () => void;
}

function SettingsModal(props: SettingsModalProps) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [biography, setBiography] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<File | string | undefined>(undefined);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, saveChange } = useUser();
  const { logout } = useLogin();

  const onSubmit = () => {
    saveChange(
      name,
      username,
      email,
      password,
      biography,
      avatar,
      props.toggleSettings,
    ).then((res) => {
      if (res) {
        props.toggleSettings();
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
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
        props.toggleSettings();
      }}
    >
      <div className="bg-bg-secondary flex flex-col gap-6 justify-center items-center rounded-lg p-4 w-full">
        <div className="flex flex-row gap-6 justify-between p-4 items-center w-full">
          <div className="flex flex-row gap-6 justify-center items-center">
            <div className="relative h-full">
              <Avatar userId={user?.id} className="-20 w-20" />
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 hover:opacity-100 duration-200 backdrop-brightness-60 rounded-full flex justify-center items-center"
              >
                <Edit2 size={25} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => {
                  setAvatar("default");
                }}
                className="absolute -bottom-1 -right-3 cursor-pointer flex justify-center items-center"
              >
                <Trash2 size={20} color="var(--color-font-secondary)" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl font-semibold">{user?.username}</h1>
              <h2 className="text-md text-font-secondary">{user?.name}</h2>
            </div>
          </div>
          <div className="w-1/2 h-full bg-bg-tertiary rounded-md flex p-2 flex-col gap-2 justify-center items-start">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="font-semibold">Biography</p>
            </div>
            <textarea
              onChange={(e) => {
                setBiography(e.target.value);
              }}
              placeholder={
                user?.biography ? user.biography : "Write your own biography ?"
              }
              className={
                "border-2 p-1 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
              }
            ></textarea>
          </div>
        </div>
        <div className="w-[90%] h-1 bg-bg-tertiary rounded-full" />
        <div className="flex flex-col gap-6 w-full justify-center items-center">
          <UserInformation
            label="Name"
            value={user?.name ? user.name : "undefined"}
            onChange={setName}
          />

          <UserInformation
            label="Username"
            value={user?.username ? user.username : "undefined"}
            onChange={setUsername}
          />

          <UserInformation
            label="Email"
            value={user?.email ? user.email : "undefined"}
            onChange={setEmail}
          />

          <UserInformation
            label="Password"
            value={"********"}
            onChange={setPassword}
          />
          <div className="w-full px-4 flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-start">
              <h3 className="font-semibold">API Key</h3>
              <p
                className={`transition-all duration-300 ${isApiKeyVisible ? undefined : "blur-xs select-none"}`}
              >
                {user?.api_key}
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <button
                onClick={() => {
                  setIsApiKeyVisible(!isApiKeyVisible);
                }}
                className="cursor-pointer"
              >
                {isApiKeyVisible ? (
                  <Eye color="var(--color-font-secondary)" size={20} />
                ) : (
                  <EyeClosed color="var(--color-font-secondary)" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center px-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-error/40 text-error text-sm font-medium hover:bg-error/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={15} />
          Logout
        </button>
        <div className="flex flex-row gap-3 items-center justify-center">
          <button
            onClick={props.toggleSettings}
            className="px-4 py-1.5 rounded-lg border border-error/40 text-error text-sm font-medium hover:bg-error/10 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={
              !(
                (name != undefined && name != "") ||
                (username != undefined && username != "") ||
                (email != undefined && email != "") ||
                (password != undefined && password != "") ||
                (biography != undefined && biography != "") ||
                avatar != undefined
              )
            }
            className="px-4 py-1.5 rounded-lg bg-accent-primary text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
          >
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
