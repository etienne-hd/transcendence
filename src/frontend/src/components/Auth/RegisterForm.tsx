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
import { useState } from "react";

interface IRegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
  conditions: boolean;
}

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterInput>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [signX, setSignX] = useState<"login" | "register">("login");

  const { pushNotification } = useNotification();
  const { setLoggedStatus } = useLogin();

  // Try to register the user on the server
  const onSubmit: SubmitHandler<IRegisterInput> = async (register) => {
    try {
      if (signX == "register") {
        await authService.register(
          register.name != "" ? register.name : register.username,
          register.username,
          register.email,
          register.password,
        );
      } else {
        await authService.login(register.username, register.password);
      }
      setLoggedStatus(true);
      pushNotification("Successfully connected", "valid");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        pushNotification(err.response.data.message, "error");
      }
    }
  };

  // Handle the form error
  const onError: SubmitErrorHandler<IRegisterInput> = (errors) => {
    const errorMessages = Object.values(errors).map((err) => err.message);

    errorMessages.map((err) => {
      if (err) {
        pushNotification(err, "error");
      }
    });
  };

  const toggleSignX = () => {
    if (signX == "login") {
      setSignX("register");
    } else {
      setSignX("login");
    }
  };

  // TODO: OAuth connexio
  // TODO: link to general terms
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col gap-4 md:flex-row bg-bg-secondary border-border-secondary border-2 p-padding-main rounded-main justify-center items-center shadow-xl ">
        <div className="flex flex-col gap-gap-main w-md items-centersm">
          <h1 className="text-4xl font-tech">Welcome</h1>
          <h1 className="text-2xl font-tech">To</h1>
          <h1 className="text-4xl font-tech">Unicord</h1>
        </div>

        <form
          className="flex flex-col justify-center items-center gap-gap-main w-md"
          onSubmit={handleSubmit(onSubmit, onError)}
          id="register"
        >
          {signX == "register" && (
            <FormInput
              {...register("email", {
                required: { value: true, message: "Email required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please provide a valid email!",
                },
                minLength: { value: 3, message: "Email too short! (3 min)" },
                maxLength: {
                  value: 320,
                  message: "Email too long! (320 max)",
                },
              })}
              label="Email *"
              type="email"
              error={errors.email}
            />
          )}

          {signX == "register" && (
            <FormInput
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Display Name too short! (1 min)",
                },
                maxLength: {
                  value: 100,
                  message: "Display Name too long! (100 max)",
                },
              })}
              label="Display Name"
              type="text"
              error={errors.name}
            />
          )}

          <FormInput
            {...register("username", {
              required: { value: true, message: "Username required" },
              minLength: { value: 1, message: "Username too short! (3 min)" },
              maxLength: { value: 100, message: "Username too long! (30 max)" },
              pattern: {
                value: /^[a-z0-9]+$/,
                message:
                  "The username may only contain lowercase letters and digits.",
              },
            })}
            label="Username *"
            type="text"
            error={errors.username}
          />

          <FormInput
            {...register("password", {
              required: { value: true, message: "Password required" },
              minLength: { value: 8, message: "Password too short! (8 min)" },
              maxLength: {
                value: 128,
                message: "Password too long! (128 max)",
              },
            })}
            label="Password *"
            type="password"
            error={errors.password}
          />

          {signX == "register" && (
            <div className="flex flex-row gap-2 ">
              <input
                {...register("conditions", {
                  required: {
                    value: true,
                    message: "Accept our Terms and Conditions",
                  },
                })}
                type="checkbox"
              />
              <label className={errors.conditions && "text-error"}>
                Accept{" "}
                <a href="/terms" className="underline">
                  General Terms
                </a>{" "}
                and{" "}
                <a href="/conditions" className="underline">
                  Conditions
                </a>
              </label>
            </div>
          )}
        </form>
      </div>
      <button
        type="submit"
        className="hover:scale-102 hover:shadow-xl cursor-pointer rounded-main p-2 border-2 border-border-secondary text-md bg-bg-secondary hover:bg-bg-tertiary transition-all duration-200 "
        form="register"
      >
        {signX == "login" ? "Login" : "Register"}
      </button>
      <button className="cursor-pointer" onClick={toggleSignX}>
        {signX == "register" ? "Already have an account ?" : "Need an account?"}
      </button>
    </div>
  );
}

export default RegisterForm;
