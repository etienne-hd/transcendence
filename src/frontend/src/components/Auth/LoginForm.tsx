import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import FormInput from "./FormInput";
import { authService } from "../../api/api.auth";
import axios from "axios";
import { useLogin } from "../../context/LoginContext";
import { useNotification } from "../../context/NotificationContext";

interface ILoginInput {
  username: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginInput>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { pushNotification } = useNotification();
  const { setLoggedStatus } = useLogin();

  // Try to login the user on the server
  const onSubmit: SubmitHandler<ILoginInput> = async (login) => {
    try {
      await authService.login(login.username, login.password);
      setLoggedStatus(true);
      pushNotification("Successfuly connected", "valid");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        pushNotification(err.response.data.message, "error");
      } else {
        console.error("Authentification failed: " + err);
      }
    }
  };

  // Handle the form error
  const onError: SubmitErrorHandler<ILoginInput> = (errors) => {
    const errorMessages = Object.values(errors).map((err) => err.message);

    errorMessages.map((err) => {
      if (err) {
        pushNotification(err, "error");
      }
    });
  };

  // TODO: OAuth connexio
  // TODO: link to general terms
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col gap-4 md:flex-row bg-bg-secondary border-border-secondary border-2 p-padding-main rounded-main justify-center items-center shadow-xl ">
        <div className="flex flex-col gap-2 justify-center items-center md:w-sm">
          <h1 className="text-4xl font-tech">Welcome Back</h1>
          <h1 className="text-2xl font-tech">To</h1>
          <h1 className="text-4xl font-tech">Unicord</h1>
        </div>

        <form
          className="flex flex-col justify-center items-center gap-gap-main w-md"
          onSubmit={handleSubmit(onSubmit, onError)}
          id="login"
        >
          <FormInput
            {...register("username", {
              required: { value: true, message: "Username required" },
              maxLength: { value: 20, message: "Username too long (20 max)" },
            })}
            label="Username"
            type="text"
            placeholder="xXTotoXx"
            error={errors.username}
          />

          <FormInput
            {...register("password", {
              required: { value: true, message: "Password Required" },
              minLength: { value: 8, message: "Minimum lenght: 8" },
            })}
            label="Password"
            type="password"
            placeholder="Your best secret"
            error={errors.password}
          />
        </form>
      </div>
      <button
        type="submit"
        className="rounded-main p-2 border-2 border-border-secondary text-md bg-bg-secondary hover:bg-bg-tertiary hover:scale-105 transition-all duration-200 "
        form="login"
      >
        Login in Unicord
      </button>
      <a href="/auth/register">Want to create an account ?</a>
    </div>
  );
}

export default LoginForm;
