import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field } from 'react-final-form';
import { Segment, Form } from 'semantic-ui-react';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { OnChange } from 'react-final-form-listeners';
import DateInput from '../../../app/common/form/DateInput';

const SelectPropertyForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPropertyTypes,
    propertyTypeRegistry,
    getPropertiesByAvailable,
    propertyRegistry,
  } = rootStore.propertyTypeStore;

  const {
    loadingInitial,
    loadProperties,
    // propertyRegistry,
    // getPropertiesByAvailable,
  } = rootStore.propertyStore;

   useEffect(() => {
     loadPropertyTypes();
     loadProperties();
   }, [loadPropertyTypes, loadProperties]);

  return (
    <Segment>
      <h2>Choose Property</h2>
      <Form.Group>
        <Field
          width={8}
          date="true"
          label="Date of Transaction"
          name="createdAt"
          placeholder="MM/DD/YYYY"
          component={DateInput}
        />
        <Field
          width={8}
          label="Property Type"
          loading={loadingInitial}
          name="propertyTypeId"
          placeholder="Property Type"
          component={SelectInput}
          options={propertyTypeRegistry}
        />
        <OnChange name="propertyTypeId">
          {(value: any, previous: any) => {
            getPropertiesByAvailable(value);
          }}
        </OnChange>
        <Field
          width={8}
          label="Property"
          name="propertyId"
          placeholder="Property"
          component={SelectInput}
          options={propertyRegistry}
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
      {/* <Form.Group fluid>
        <Field
          width={8}
          label="Sales Manager"
          name="salesManagerId"
          placeholder="Sales Manager"
          component={SelectInput}
        />
        <Field
          width={8}
          label="Sales Agent"
          name="salesAgentId"
          placeholder="Sales Agent"
          component={SelectInput}
        />
      </Form.Group> */}
    </Segment>
  );
};

export default observer(SelectPropertyForm);
