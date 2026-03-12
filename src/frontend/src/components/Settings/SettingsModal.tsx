import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import UserInformation from "./UserInformation";
import axios from "axios";
import { userService } from "../../api/api.user";
import { useNotification } from "../../context/NotificationContext";
import Modal from "../Modal";

interface SettingsModalProps {
  toggleSettings: () => void;
}

//TODO : Close callback
function SettingsModal(props: SettingsModalProps) {
  // All user information edit state
  const [name, setName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [biography, setBiography] = useState<string | undefined>(undefined);

  // TODO : Add avatar switching
  // TODO : logout button
  // TODO : Change that by active status of user
  const isActive = true;

  const { user, setUser } = useUser();
  const { pushNotification } = useNotification();

  const saveChange = async () => {
    if (
      name != undefined ||
      username != undefined ||
      email != undefined ||
      password != undefined ||
      biography != undefined
    ) {
      try {
        const response = await userService.updateMe(
          email,
          username,
          name,
          password,
          biography,
        );

        setUser(response);
        pushNotification("Change saved", "valid");
        props.toggleSettings();
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          pushNotification(e.response.data.message, "error");
        }
      }
    }
  };

  // Leave with escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.toggleSettings();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <Modal
      onClick={() => {
        props.toggleSettings();
      }}
    >
      <div className="bg-bg-secondary flex flex-col gap-6 justify-center items-center rounded-lg p-4 w-full">
        <div className="flex flex-row gap-6 justify-between p-4 items-center w-full">
          <div className="flex flex-row gap-6 justify-center items-center">
            <div className="relative h-full">
              <img
                src={user?.avatar ? user.avatar : "placehoder"}
                className="rounded-full h-20 w-20"
              />
              <div
                className={
                  "absolute bottom-0 right-0 w-4 h-4 rounded-full " +
                  (isActive ? "bg-green-500" : "bg-error")
                }
              ></div>
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
      <div className="w-full flex flex-row justify-end items-center gap-6">
        <button
          onClick={() => {
            props.toggleSettings();
          }}
          className="p-2 bg-error w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
        >
          <p>Cancel</p>
        </button>
        <button
          onClick={saveChange}
          disabled={
            !(
              (name != undefined && name != "") ||
              (username != undefined && username != "") ||
              (email != undefined && email != "") ||
              (password != undefined && password != "") ||
              (biography != undefined && biography != "")
            )
          }
          className="p-2 bg-accent-primary disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-white/5 w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
        >
          <p>Save changes</p>
        </button>
      </div>
    </Modal>
  );
}

export default SettingsModal;
