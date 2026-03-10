import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import { authService } from "../../api/api.auth";
import axios from "axios";

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
  } = useForm<IRegisterInput>();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IRegisterInput> = async (register) => {
    try {
      await authService.register(
        register.name,
        register.username,
        register.email,
        register.email,
      );
      setIsLogged(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Authentification failed");
      }
    }
  };

  const onError: SubmitErrorHandler<IRegisterInput> = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isLogged) {
      // TODO: Change page
      console.log("Connected");
    }
  }, [isLogged]);

  // TODO: OAuth connexio
  // TODO: link to general terms
  // TODO: Afficher l'erreur sur le menu de l'utilisateur
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col gap-4 md:flex-row bg-bg-secondary border-border-secondary border-2 p-padding-main rounded-main justify-center items-center shadow-xl ">
        <div className="flex flex-col gap-2 justify-center items-center md:w-sm">
          <h1 className="text-4xl font-tech">Welcome</h1>
          <h1 className="text-2xl font-tech">To</h1>
          <h1 className="text-4xl font-tech">Unicord</h1>
        </div>

        <form
          className="flex flex-col justify-center items-center gap-gap-main w-md"
          onSubmit={handleSubmit(onSubmit, onError)}
          id="register"
        >
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

          <div className="flex flex-row gap-2 ">
            <input
              {...register("conditions", {
                required: { value: true, message: "Accept our generals terms" },
              })}
              type="checkbox"
            />
            <label className={errors.conditions && "text-error"}>
              General terms of utilisation
            </label>
          </div>
        </form>
      </div>
      <button
        type="submit"
        className="rounded-main p-2 border-2 border-border-secondary text-md bg-bg-secondary hover:bg-bg-tertiary hover:scale-105 transition-all duration-200 "
        form="register"
      >
        Register in Unicord
      </button>
    </div>
  );
}

export default RegisterForm;
