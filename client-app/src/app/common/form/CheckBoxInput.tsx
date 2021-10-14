import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form } from 'semantic-ui-react';

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const CheckBoxInput: React.FC<IProps> = ({
  input,
  label,
  type,
  checked = false,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type}>
      {/* <Checkbox
        label={label}
        value={input.value}
        name={input.name}
        onChange={input.onChange}
        as={input.type}
      /> */}
      <div className="ui checkbox">
        <input {...input} onChange={input.onChange}/>
        <label>{label}</label>
      </div>
    </Form.Field>
  );
};

export default CheckBoxInput;
