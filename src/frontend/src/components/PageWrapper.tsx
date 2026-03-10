import { type ReactNode } from "react";

interface PageWrapperProps {
  children?: ReactNode;
  className?: string;
}

function PageWrapper(props: PageWrapperProps) {
  return (
    <>
      <div
        className={
          "bg-bg-main text-font-main w-full h-full flex flex-col " +
          (props.className ? props.className : "")
        }
      >
        {props.children}
      </div>
    </>
  );
}

export default PageWrapper;
