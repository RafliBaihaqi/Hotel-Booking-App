import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients"; //impprt function from api-clients as variables
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

//Step 1: Create form type
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

//Step 2: Define Functional Compoenent that will be used in the form
const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },  
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  //Step 4:Create Submit Functions
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    //Step 3: Create the form field
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-grey-700 text-sm font-bold flex-1">
          First name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This Field Is Required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message} </span>
          )}
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Last name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This Field Is Required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message} </span>
          )}
        </label>
      </div>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This Field Is Required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message} </span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This Field Is Required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message} </span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This Field Is Required";
              } else if (watch("password") !== val) {
                return "Your Password Do Not Match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">
            {errors.confirmPassword.message}{" "}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Have an account{"? "}
          <Link className="underline hover:text-blue-600" to="/sign-in">
            Sign in here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
