interface AvatarProps {
  userId: number | undefined;
  className?: string;
  showStatus?: boolean;
}

function Avatar(props: AvatarProps) {
  const logged = true;

  return (
    <>
      <div className={"relative " + props.className}>
        <img
          src={"http://localhost:3000/user" + props.userId + "/avatar"}
          className={"rounded-full relative h-full w-full"}
        />
        {props.showStatus && (
          <div
            className={
              "absolute bottom-0 right-0 w-2 h-2 rounded-full " +
              (logged ? "bg-green-500" : "bg-error")
            }
          ></div>
        )}
      </div>
    </>
  );
}

export default Avatar;
