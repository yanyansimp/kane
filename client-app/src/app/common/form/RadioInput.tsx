import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form } from 'semantic-ui-react';

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const RadioInput: React.FC<IProps> = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type}>
      <div className="ui radio checkbox">
        <input {...input} />
        <label>{label}</label>
      </div>
    </Form.Field>
  );
};

export default RadioInput
