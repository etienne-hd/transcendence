import NotFound from "../../components/Error/404";
import PageWrapper from "../../components/PageWrapper";

function NotFoundPage() {
  return (
    <>
      <PageWrapper className="justify-center items-center p-16" needLog={false}>
        <NotFound />
      </PageWrapper>
    </>
  );
}

export default NotFoundPage;
