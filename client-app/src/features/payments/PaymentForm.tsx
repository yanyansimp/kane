import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput'
import { RootStoreContext } from '../../app/stores/rootStore';
import { PaymentFormValues } from '../../app/models/payment';
import { v4 as uuid } from 'uuid';
import RadioInput from '../../app/common/form/RadioInput';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
  // TransactionType: isRequired('Transaction'),
  // ReceivedFrom:isRequired('Receiver'),
  // DateOfPayment:isRequired('Date Of Payment'),
  // AccountNo:isRequired('Account No'),
  // Address:isRequired('Address'),
  // MobileNo:isRequired('Mobile No'),
  // CheckNo:isRequired('CheckNo No'),
  // BankName:isRequired('Bank'),
  // Branch:isRequired('Branch'),
  // InPaymentOf:isRequired('Payment'),
  // Amount:isRequired('Amount'),
});


const PaymentForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadTransactionTypes,  transactionTypeRegistry} = rootStore.transactionTypeStore;
  const { roleRegistry, user } = rootStore.userStore
  const { createPayment, submitting, loading } = rootStore.paymentStore;
  const [payment, settransactionType] = useState(new PaymentFormValues());
  // const [loading, setLoading] = useState(false);
  const [disable, setDisable] = React.useState(true);

  const handleFinalFormSubmit = (values: any) => {
    const { ...payment } = values;
    let newPayment = {
      id: uuid(), 
      ...payment,
    };
    // console.log(newPayment);
    createPayment(newPayment);
  };

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  useEffect(() => {
    loadTransactionTypes()
  }, [loadTransactionTypes]);

  return (
    <Grid>
      <Grid.Column width={12}>
        <h2>New Payment</h2>

        <FinalForm
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              <Segment>
                <Form.Group>
                  <Field
                    fluid
                    width={8}
                    name="transactionSequenceNo"
                    label="Transaction No."
                    placeholder="Transaction Number"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    date={true}
                    name="dateOfPayment"
                    label="Date of Payment"
                    placeholder={today.toLocaleDateString()}
                    value={payment.dateOfPayment}
                    component={DateInput}
                  />
                </Form.Group>
                <Form.Group fluid>
                  <Field
                    basic
                    width={8}
                    name="clientName"
                    label="Client Name"
                    placeholder="Client Name"
                    // value={payment.oRNumber}
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="property"
                    label="Property"
                    placeholder="Property"
                    // value={payment.ORNumber}
                    component={TextInput}
                  />
                </Form.Group>
              </Segment>

              <Segment>
                <Form.Group>
                  <Field
                    width={8}
                    name="orNumber"
                    label="OR Number"
                    placeholder="OR Number"
                    value={payment.oRNumber}
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="amount"
                    label="Amount"
                    placeholder="Amount"
                    value={payment.amount}
                    component={TextInput}
                  />
                </Form.Group>
                <h4>Mode of Payment:</h4>
                <Form.Group>
                  <Field
                    name="modeOfPayment"
                    label="Cash"
                    type="radio"
                    value="Cash"
                    id="Cash"
                    onClick={() => setDisable(true)}
                    component={RadioInput}
                  />
                  <Field
                    name="modeOfPayment"
                    label="Cheque"
                    type="radio"
                    value="Cheque"
                    id="Cheque"
                    onClick={() => setDisable(false)}
                    component={RadioInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    disabled={disable}
                    width={8}
                    name="bankName"
                    label="Bank Name"
                    placeholder="Bank Name"
                    value={payment.bankName}
                    component={TextInput}
                  />
                  <Field
                    disabled={disable}
                    width={8}
                    name="branch"
                    label="Branch"
                    placeholder="Branch"
                    value={payment.branch}
                    component={TextInput}
                  />
                </Form.Group>
              </Segment>

              {/* <Form.Group>
                <Input
                  width={10}
                  style={searchBar}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="search"
                  icon="search"
                />
              </Form.Group> */}
              <Button
                loading={submitting}
                disabled={loading || invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                disabled={loading}
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        />
      </Grid.Column>
    </Grid>
  );
}

export default observer(PaymentForm);
