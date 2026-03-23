import TermsContent from "../../components/Auth/Terms";
import PageWrapper from "../../components/PageWrapper";

function Terms() {
  return (
    <>
      <PageWrapper
        className="justify-center items-center p-16"
        needLog={false}
        redirectLog="/"
      >
        <TermsContent />
      </PageWrapper>
    </>
  );
}

export default Terms;
