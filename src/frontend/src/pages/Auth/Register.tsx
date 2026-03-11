import RegisterForm from "../../components/Auth/RegisterForm";
import PageWrapper from "../../components/PageWrapper";

function Register() {
  return (
    <>
      <PageWrapper
        className="justify-center items-center"
        needLog={false}
        redirectLog="/"
      >
        <RegisterForm />
      </PageWrapper>
    </>
  );
}

export default Register;
