import { Edit2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface UserInformationProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function UserInformation(props: UserInformationProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  return (
    <div className="w-full px-4 flex flex-row justify-between items-center">
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-semibold">{props.label}</h3>
        <p>{props.value}</p>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <AnimatePresence>
          {editing && (
            <motion.input
              placeholder={props.value}
              initial={{ opacity: 0, x: 0, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: 0, width: 0 }}
              className={
                "border-2 p-1 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
              }
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
              ref={inputRef}
            ></motion.input>
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            setEditing(true);
          }}
          className="cursor-pointer"
        >
          <Edit2 color="var(--color-font-secondary)" size={20} />
        </button>
      </div>
    </div>
  );
}

export default UserInformation;
