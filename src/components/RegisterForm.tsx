import Joi from "joi";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { IUser } from "../store/types/IUser";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setToken } from "../store/features/auth";
import { useRegisterUserMutation } from "../store/services/rtkApi";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [registerUser] = useRegisterUserMutation();

  const schema = Joi.object<RegisterFormData>({
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(6).max(24).required().label("Password"),
  });

  const { data, handleSubmit, renderInput, renderButton } =
    useForm<RegisterFormData>({ name: "", email: "", password: "" }, schema);

  async function doSubmit() {
    const user: IUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await registerUser(user).unwrap();
      const token = result.token;

      if (typeof token === "string") {
        dispatch(setToken(token));
        console.log("Registration successful!");
        window.location.assign("/foods");
      } else {
        console.error("Invalid token format:", token);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
      } else {
        console.error("Registration failed with an unknown error:", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      {renderInput("name", "Name", "text")}
      {renderInput("email", "Email", "text")}
      {renderInput("password", "Password", "password")}
      {renderButton("Submit")}
    </form>
  );
}

export default RegisterForm;
