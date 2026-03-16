interface FriendModalInformationProps {
  label: string;
  value: string | undefined;
}

function FriendModalInformation(props: FriendModalInformationProps) {
  return (
    <div className="w-full px-4 flex flex-row justify-between items-center">
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-semibold">{props.label}</h3>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export default FriendModalInformation;
