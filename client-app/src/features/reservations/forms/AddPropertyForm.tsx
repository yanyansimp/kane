import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Divider, Form, Segment } from 'semantic-ui-react';
import DateInput from '../../../app/common/form/DateInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { TransactionFormValues } from '../../../app/models/transaction';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from 'uuid';

interface DetailParams {
  clientId: string;
  transactionId: string;
}

const AddPropertyForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {

  const rootStore = useContext(RootStoreContext);

  const { 
    submitting, 
    loadClient, 
    loadReservation, 
    client, 
    addReservation,
    editReservation
  } = rootStore.reservationStore;

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

   const { loadSalesManagersAgents, salesManagerRegistry, salesAgentRegistry } =
     rootStore.userStore;

  const [transaction, setTransaction] = useState(new TransactionFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPropertyTypes();
    loadProperties();
    loadSalesManagersAgents();
    if (match.params.clientId && match.params.transactionId) {
      setLoading(true);
      loadReservation(match.params.clientId, match.params.transactionId)
        .then((transaction) =>
          setTransaction(new TransactionFormValues(transaction))
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      loadClient(match.params.clientId)
        .then((transaction) => setTransaction(new TransactionFormValues()))
        .finally(() => setLoading(false));
    }
  }, [
    match.params.clientId,
    match.params.transactionId,
    loadPropertyTypes,
    loadProperties,
    loadSalesManagersAgents,
    loadReservation,
    loadClient
  ]);

  const handleFinalFormSubmit = (values: any) => {
    // console.log(match.params.clientId);
    if (!transaction.id) {
      let newTransaction = {
        clientId: match.params.clientId,
        ...values
      };
      console.log("new");
      console.log(newTransaction);
      addReservation(newTransaction);
    } else {
      let transaction = {
        clientId: match.params.clientId,
        transactionId: match.params.transactionId,
        salesManagerId: values.salesManagerId,
        salesAgentId: values.salesAgentId,
        propertyId: values.property.id,
        newPropertyId: values.propertyId,
        contractPrice: values.contractPrice,
        monthlyAmortization: values.monthlyAmortization,
        terms: values.terms,
        // ...values
      };
      editReservation(transaction);
      console.log("edit");
      console.log(transaction);
    }
    
  };

  return (
    <Segment clearing>
      {match.params.transactionId && match.params.clientId ? (
        <h2>Edit Reservation</h2>
      ) : (
        <h2>Add Reservation</h2>
      )}

      <Divider clearing />

      {match.params.transactionId && match.params.clientId ? (
        <h2>
          {transaction?.clientName}(#{transaction?.sequenceNo}-
          {transaction?.propertyTypeName}{' '}
          {transaction?.property?.name})
        </h2>
      ) : (
        <h2>
          {client?.firstName} {client?.lastName}
        </h2>
      )}

      <Divider clearing />
      <FinalForm
        initialValues={transaction}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
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
            <Form.Group fluid>
              <Field
                width={8}
                label="Sales Manager"
                name="salesManagerId"
                placeholder="Sales Manager"
                component={SelectInput}
                options={salesManagerRegistry}
              />
              <Field
                width={8}
                label="Sales Agent"
                name="salesAgentId"
                placeholder="Sales Agent"
                component={SelectInput}
                options={salesAgentRegistry}
              />
            </Form.Group>
            <Button
              loading={submitting}
              // disabled={loading || invalid || pristine}
              disabled={loading || invalid }
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              // onClick={
              //   activity.id
              //     ? () => history.push(`/activities/${activity.id}`)
              //     : () => history.push('/activities')
              // }
              disabled={loading}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(AddPropertyForm);
