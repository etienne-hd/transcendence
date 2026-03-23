import ConditionsContent from "../../components/Auth/ConditionsContent";
import PageWrapper from "../../components/PageWrapper";

function Conditions() {
  return (
    <>
      <PageWrapper
        className="justify-center items-center p-16"
        needLog={false}
        redirectLog="/"
      >
        <ConditionsContent />
      </PageWrapper>
    </>
  );
}

export default Conditions;
