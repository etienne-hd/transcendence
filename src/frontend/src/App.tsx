import "./App.css";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
    <PageWrapper needLog={true} redirectNoLog="/auth">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl"> Welcome to Unicord</h1>
        <p>Select a friend to start</p>
      </div>
    </PageWrapper>
  );
}

export default App;
