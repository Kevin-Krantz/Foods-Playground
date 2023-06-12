import { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import styled from "styled-components";

export function useForm<FormData>(
  formData: FormData,
  schema: Joi.ObjectSchema<FormData>
) {
  type Errors = {
    [Property in keyof FormData]?: string;
  };

  const [data, setData] = useState<FormData>(formData);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(doSubmit: () => void) {
    return function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const errors = validate();
      setErrors(errors || {});

      if (errors) return;

      doSubmit();
    };
  }

  function handleChange({ target: input }: ChangeEvent<HTMLInputElement>) {
    const inputName = input.name as keyof FormData;

    const errorMessage = validateProperty(input);

    if (errorMessage) errors[inputName] = errorMessage;
    else delete errors[inputName];

    setErrors({ ...errors });

    data[inputName] = input.value as FormData[keyof FormData];

    setData({ ...data });
    console.log(input.name, input.value);
  }

  function validateProperty({ name, value }: HTMLInputElement) {
    const subSchema = schema.extract(name);
    const { error } = subSchema.validate(value);

    return error?.message || null;
  }

  function validate() {
    const options: Joi.ValidationOptions = { abortEarly: false };
    const { error } = schema.validate(data, options);

    if (!error) return null;

    const errors: Errors = {};
    for (const detail of error.details)
      errors[detail.path[0] as keyof Errors] = detail.message;

    return errors;
  }

  function renderInput(
    name: keyof FormData,
    label: string,
    type: string
  ): JSX.Element {
    return (
      <StyledFormContainer>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput
          name={name as string}
          value={data[name] as string}
          onChange={handleChange}
          type={type}
        />
        {errors[name] && <StyledError>{errors[name]}</StyledError>}
      </StyledFormContainer>
    );
  }

  function renderButton(label: string): JSX.Element {
    return <StyledButton disabled={!!validate()}>{label}</StyledButton>;
  }

  return { data, errors, handleSubmit, renderButton, renderInput };
}

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px auto;
`;

const StyledLabel = styled.label`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledError = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: block;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
