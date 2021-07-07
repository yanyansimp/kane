import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  label,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <Form.Input {...input} placeholder={placeholder} label={label} />
      {touched && error && (
        <Label basic pointing color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
