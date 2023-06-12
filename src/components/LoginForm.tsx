import Joi from "joi";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setToken } from "../store/features/auth";
import { useLoginUserMutation } from "../store/services/rtkApi";
import { useState } from "react";
import styled from "styled-components";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const schema = Joi.object<LoginFormData>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const { data, handleSubmit, renderInput, renderButton } =
    useForm<LoginFormData>({ email: "", password: "" }, schema);

  async function doSubmit() {
    try {
      const result = await loginUser(data).unwrap();
      const token = result;

      if (typeof token === "string") {
        dispatch(setToken(token));
        console.log("Login successful!");
        window.location.assign("/foods");
      } else {
        console.error("Invalid token format:", token);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setErrorMessage("An unknown error occurred. Please try again.");
      } else {
        console.error("Login failed with an unknown error:", error);
        setErrorMessage("Invalid email or password.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <FormContainer>
        {renderInput("email", "Email", "text")}
        {renderInput("password", "Password", "password")}
        {errorMessage && (
          <ErrorMessage className="alert alert-danger">
            {errorMessage}
          </ErrorMessage>
        )}
        {renderButton("Login")}
      </FormContainer>
    </form>
  );
}

export default LoginForm;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
