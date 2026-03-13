import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "../../context/MessageContext";

//TODO: textarea qui s'ajuste toute seul
function MessageInput() {
  const [content, setContent] = useState<string>("");

  const { pushMessage } = useMessage();

  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "50px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [content]);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content.trim() != "") {
      pushMessage(content).then((sent) => {
        if (sent) {
          setContent("");
        }
      });
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
        disabled={content.trim() == ""}
        onClick={onSubmit}
        className="h-[46px] flex gap-4 justify-center items-center p-2 bg-accent-primary disabled:cursor-auto disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-white/5 w-fit rounded-md hover:scale-102 hover:shadow-xl duration-200 cursor-pointer"
      >
        <p className="text-bg-secondary">Send</p>
        <Send color="var(--color-bg-secondary)" />
      </button>
    </div>
  );
}

export default MessageInput;
