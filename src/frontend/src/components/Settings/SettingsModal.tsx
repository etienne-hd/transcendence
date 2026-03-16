import { useUser } from "../../context/UserContext";
import { useEffect, useRef, useState } from "react";
import UserInformation from "./UserInformation";
import Modal from "../Modal";
import { useLogin } from "../../context/LoginContext";
import { Edit2 } from "lucide-react";
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
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

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
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center px-4 ">
        <div
          onClick={() => {
            logout();
          }}
          className="w-fit cursor-pointer"
        >
          <p className="text-error underline">logout</p>
        </div>
        <div className="flex flex-row gap-6 items-center justify-center">
          <button
            onClick={() => {
              props.toggleSettings();
            }}
            className="p-2 bg-error w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
          >
            <p>Cancel</p>
          </button>
          <button
            onClick={() => {
              onSubmit();
            }}
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
            className="p-2 bg-accent-primary disabled:cursor-auto disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-white/5 w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
          >
            <p>Save changes</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
