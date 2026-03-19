import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "../../context/MessageContext";
import LoadingSpinner from "../LoadingSpinner";

function MessageInput() {
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { pushMessage } = useMessage();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resizeTextArea = () => {
    textAreaRef.current!.style.height = "50px";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [content]);

  const onChange = (e: any) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content.trim() != "" || file != undefined) {
      setLoading(true);
      pushMessage(content, file)
        .then((sent) => {
          if (sent) {
            setContent("");
            setFile(undefined);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
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
    <>
      <div className="flex-col gap-2">
        {file != undefined && (
          <div className="px-4 pt-4  w-full flex min-w-0 h-fit justify-start items-center flex-row gap-2">
            <Paperclip className="shrink-0" />
            <p className="truncate min-w-0">{file.name}</p>
          </div>
        )}
        <div className="flex flex-row w-full p-4 gap-4 justify-center items-end">
          <textarea
            className={
              "pt-2 max-h-[30vh] resize-none border-2 p-1 rounded-main w-full bg-bg-tertiary border-border-tertiary  focus:border-accent-primary outline-hidden invalid:border-error "
            }
            ref={textAreaRef}
            onChange={onChange}
            value={content}
          />

          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="h-[46px] bg-bg-secondary p-2 rounded-full aspect-square justify-center items-center flex cursor-pointer hover:brightness-130 hover:scale-102 duration-200 hover:shadow-xl"
          >
            <Paperclip />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="*"
            className="hidden"
          />
          <button
            disabled={(content.trim() == "" && !file) || loading}
            onClick={onSubmit}
            className="h-[46px] flex gap-4 justify-center items-center p-2 bg-accent-primary disabled:cursor-auto disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-white/5 w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
          >
            <p className="text-bg-secondary">Send</p>
            {loading ? (
              <LoadingSpinner className="w-6.5 h-6.5 " />
            ) : (
              <Send color="var(--color-bg-secondary)" size={26} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
