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
          register.name,
          register.username,
          register.email,
          register.password,
        );
      } else {
        await authService.login(register.username, register.password);
      }
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
              {...register("name", {
                required: { value: true, message: "Name required" },
                maxLength: { value: 20, message: "Name too long (20 max)" },
              })}
              label="Name"
              type="text"
              placeholder="Toto"
              error={errors.name}
            />
          )}

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

          {signX == "register" && (
            <FormInput
              {...register("email", {
                required: { value: true, message: "Email required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email format",
                },
              })}
              label="Email"
              type="email"
              placeholder="xXTotoXx@gmail.com"
              error={errors.email}
            />
          )}

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

          {signX == "register" && (
            <div className="flex flex-row gap-2 ">
              <input
                {...register("conditions", {
                  required: {
                    value: true,
                    message: "Accept our generals terms",
                  },
                })}
                type="checkbox"
              />
              <label className={errors.conditions && "text-error"}>
                General terms of utilisation
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
        Register in Unicord
      </button>
      <button className="cursor-pointer" onClick={toggleSignX}>
        {signX == "register"
          ? "Already have an account ?"
          : "Want to join us ?"}
      </button>
    </div>
  );
}

export default RegisterForm;
