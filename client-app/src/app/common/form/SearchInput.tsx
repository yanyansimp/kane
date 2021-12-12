import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const SearchInput: React.FC<IProps> = ({
  input,
  label,
  width,
  type,
  placeholder,
  // onSearchChange = (id: any) => void,
  results,
  loading = false,
  meta: { touched, error },
  
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {/* <Form.Input {...input} placeholder={placeholder} label={label} /> */}
      <label>{label}</label>
      <Search 
        width={width}
        results={results}
        placeholder={placeholder}
        // onSearchChange={onSearchChange}
      />
      {touched && error && (
        <Label basic pointing color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SearchInput;
