import React from 'react';
import { Field } from 'react-final-form';
import { Segment, Form } from 'semantic-ui-react';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';

const SelectPropertyForm = () => {
  return (
    <Segment>
      <h2>Choose Property</h2>
      <Form.Group fluid>
        <Field
          width={8}
          label="Property Type"
          name="propertyType"
          placeholder="Property Type"
          component={SelectInput}
        />
        <Field
          width={8}
          label="Property"
          name="property"
          placeholder="property"
          component={SelectInput}
        />
      </Form.Group>
      <Form.Group fluid>
        <Field
          width={4}
          label="Contract Price"
          name="contractPrice"
          placeholder="Contract Price"
          component={TextInput}
        />
        <Field
          width={4}
          label="Monthly Amortization"
          name="monthlyAmortization"
          placeholder="Monthly Amortization"
          component={TextInput}
        />
        <Field
          width={4}
          label="Terms"
          name="terms"
          placeholder="Terms"
          component={TextInput}
        />
        <Field
          width={4}
          label="Network"
          name="network"
          placeholder="Network"
          component={TextInput}
        />
      </Form.Group>
      <Form.Group fluid>
        <Field
          width={8}
          label="Sales Manager"
          name="salesManager"
          placeholder="Sales Manager"
          component={SelectInput}
        />
        <Field
          width={8}
          label="Sales Agent"
          name="salesAgent"
          placeholder="Sales Agent"
          component={SelectInput}
        />
      </Form.Group>
    </Segment>
  );
};

export default SelectPropertyForm;
