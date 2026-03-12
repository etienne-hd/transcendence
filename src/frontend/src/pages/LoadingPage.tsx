import LoadingSpinner from "../components/LoadingSpinner";

interface LoadingPageProps {
  className?: string;
}

function LoadingPage(props: LoadingPageProps) {
  return (
    <div
      className={
        "h-full w-full flex justify-center items-center " + props.className
      }
    >
      <LoadingSpinner className="w-15 h-15" />
    </div>
  );
}

export default LoadingPage;
