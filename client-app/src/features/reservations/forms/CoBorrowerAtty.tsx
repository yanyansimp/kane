import React from 'react'
import { Field } from 'react-final-form';
import { Form, Segment } from 'semantic-ui-react';
import DateInput from '../../../app/common/form/DateInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { gender } from '../../../app/common/options/genderOptions';

const CoBorrowerAtty = () => {
    return (
      <Segment>
        <h2>Co-Borrower's Information</h2>
        <Form.Group>
          <Field
            width={8}
            label="Last Name"
            name="coLastName"
            placeholder="Last Name"
            component={TextInput}
          />
          <Field
            width={8}
            label="First Name"
            name="coFirstName"
            placeholder="First Name"
            component={TextInput}
          />
          <Field
            width={8}
            label="Middle Name"
            name="coMiddleName"
            placeholder="Middle Name"
            component={TextInput}
          />
        </Form.Group>
        <Form.Group>
          <Field
            width={8}
            label="Suffix"
            name="coSuffix"
            placeholder="Suffix"
            component={TextInput}
          />
          <Field
            width={8}
            date="true"
            label="Date of Birth"
            name="coBirthDate"
            placeholder="MM/DD/YYYY"
            component={DateInput}
          />
          <Field
            width={8}
            label="Gender"
            name="coGender"
            placeholder="Gender"
            options={gender}
            component={SelectInput}
          />
          <Field
            width={8}
            label="TIN"
            name="coTin"
            placeholder="TIN"
            component={TextInput}
          />
        </Form.Group>
        <h2>Attorney In-Fact's Information</h2>
        <Form.Group>
          <Field
            width={8}
            label="Last Name"
            name="atLastName"
            placeholder="Last Name"
            component={TextInput}
          />
          <Field
            width={8}
            label="First Name"
            name="atFirstName"
            placeholder="First Name"
            component={TextInput}
          />
          <Field
            width={8}
            label="Middle Name"
            name="atMiddleName"
            placeholder="Middle Name"
            component={TextInput}
          />
        </Form.Group>
        <Form.Group>
          <Field
            width={8}
            label="Suffix"
            name="atSuffix"
            placeholder="Suffix"
            component={TextInput}
          />
          <Field
            width={8}
            date="true"
            label="Date of Birth"
            name="atBirthDate"
            placeholder="MM/DD/YYYY"
            component={DateInput}
          />
          <Field
            width={8}
            label="Gender"
            name="atGender"
            placeholder="Gender"
            options={gender}
            component={SelectInput}
          />
          <Field
            width={8}
            label="TIN"
            name="atTin"
            placeholder="TIN"
            component={TextInput}
          />
        </Form.Group>
      </Segment>
    );
}

export default CoBorrowerAtty
