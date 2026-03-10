import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import FormInput from "./FormInput";

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
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>();

  // TODO: API call for submition
  const onSubmit: SubmitHandler<IRegisterInput> = (register) => {
    console.log(register);
  };

  const onError: SubmitErrorHandler<IRegisterInput> = (errors) => {
    console.log(errors);
  };

  // TODO: OAuth connexion
  return (
    <div className="flex flex-col gap-4 md:flex-row bg-bg-secondary border-border-secondary border-2 p-padding-main rounded-main justify-center items-center shadow-xl ">
      <div className="flex justify-center items-center md:w-md">
        <h1>Welcome</h1>
      </div>

      <form
        className="flex flex-col justify-center items-center gap-gap-main w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
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

        <input
          type="submit"
          className="rounded-main p-2 mt-4 bg-accent-primary hover:bg-accent-secondary hover:scale-105 transition-all duration-200 text-bg-secondary"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
