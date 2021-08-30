import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, Form, Segment } from 'semantic-ui-react';
import DateInput from '../../../app/common/form/DateInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { gender } from '../../../app/common/options/genderOptions';

const PersonalInfoForm = () => {
  return (
    <Segment>
      <h2>Personal Information</h2>
      <Form.Group>
        <Field
          width={8}
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          component={TextInput}
        />
        <Field
          width={8}
          label="First Name"
          name="firstName"
          placeholder="First Name"
          component={TextInput}
        />
        <Field
          width={8}
          label="Middle Name"
          name="middleName"
          placeholder="Middle Name"
          component={TextInput}
        />
      </Form.Group>
      <Form.Group>
        <Field
          width={8}
          label="Suffix"
          name="suffix"
          placeholder="Suffix"
          component={TextInput}
        />
        <Field
          width={8}
          date="true"
          label="Date of Birth"
          name="birthDate"
          placeholder="MM/DD/YYYY"
          component={DateInput}
        />
        <Field
          width={8}
          label="Gender"
          name="gender"
          placeholder="Gender"
          options={gender}
          component={SelectInput}
        />
        <Field
          width={8}
          label="Civil Status"
          name="civilStatus"
          placeholder="Civil Status"
          component={TextInput}
        />
      </Form.Group>
      <Form.Group>
        <Field
          width={8}
          label="Religion"
          name="religion"
          placeholder="Religion"
          component={TextInput}
        />
        <Field
          width={8}
          label="TIN"
          name="tin"
          placeholder="TIN"
          component={TextInput}
        />
        <Field
          width={8}
          label="Contact Number"
          name="contactNumber"
          placeholder="Contact Number"
          component={TextInput}
        />
        <Field
          width={8}
          label="Zip Code"
          name="zipCode"
          placeholder="Zip Code"
          component={TextInput}
        />
      </Form.Group>
      <Form.Group>
        <Field
          width={16}
          label="Address"
          name="address"
          placeholder="Address"
          component={TextInput}
        />
      </Form.Group>
      <h2>Spouse' Information</h2>
      <Form.Group>
        <Checkbox label="Spouse Information (Please check if applicable)" />
      </Form.Group>
      <Form.Group>
        <Field
          width={8}
          label="Last Name"
          name="spouseLastName"
          placeholder="Last Name"
          component={TextInput}
        />
        <Field
          width={8}
          label="First Name"
          name="spouseFirstName"
          placeholder="First Name"
          component={TextInput}
        />
        <Field
          width={8}
          label="Middle Name"
          name="spouseMiddleName"
          placeholder="Middle Name"
          component={TextInput}
        />
      </Form.Group>
      <Form.Group>
        <Field
          width={8}
          date="true"
          label="Date of Birth"
          name="spouseBirthDate"
          placeholder="MM/DD/YYYY"
          component={DateInput}
        />
        <Field
          width={8}
          label="Gender"
          name="spouseGender"
          placeholder="Gender"
          options={gender}
          component={SelectInput}
        />
        <Field
          width={8}
          label="TIN"
          name="spouseTin"
          placeholder="TIN"
          component={TextInput}
        />
      </Form.Group>
    </Segment>
  );
};

export default PersonalInfoForm;
