import { useEffect, type ReactNode } from "react";

interface ModalProps {
  toggleModal: () => void;
  children: ReactNode;
}

function Modal(props: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <div
      onClick={() => {
        props.toggleModal();
      }}
      className="fixed flex justify-center items-center top-0 left-0 z-20 w-full h-full bg-black/40 backdrop-blur-xs"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-bg-tertiary p-4 max-h-[70%] flex flex-col gap-4 w-200 overflow-y-scroll rounded-xl"
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
