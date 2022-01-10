import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Search, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput'
import { RootStoreContext } from '../../app/stores/rootStore';
import { PaymentFormValues } from '../../app/models/payment';
import { v4 as uuid } from 'uuid';
import RadioInput from '../../app/common/form/RadioInput';
import { observer } from 'mobx-react-lite';
import SearchInput from '../../app/common/form/SearchInput';
import SelectInput from '../../app/common/form/SelectInput';
import { RouteComponentProps } from 'react-router-dom';
import { OnChange } from 'react-final-form-listeners';

interface DetailParams {
  id: string;
}

const validate = combineValidators({
  // TransactionType: isRequired('Transaction'),
  // ReceivedFrom:isRequired('Receiver'),
  // dateOfPayment: isRequired('Date of Payment'),
  // transactionSequenceNo: isRequired('Transaction'),
  // orNumber: isRequired('A.R Number'),
  // amount: isRequired('Amount'),
  // bankName:isRequired('Bank/Type/Mode of Payment'),
  // Branch:isRequired('Branch'),
  // InPaymentOf:isRequired('Payment'),
  // Amount:isRequired('Amount'),
});

const intitialState = {
  isLoading: false,
  results: [],
  value: ""
};

const PaymentForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  const { loadTransactionTypes, transactionTypeRegistry } = rootStore.transactionTypeStore;
  const { roleRegistry, user } = rootStore.userStore;

  const { createPayment, editPayment, loadPayment, submitting } = rootStore.paymentStore;
  const {
    searchClient,
    loadClientProperties,
    searchResults,
    loadingSearch,
    clientProperties,
  } = rootStore.reservationStore;
  
  const [payment, setPayment] = useState(new PaymentFormValues());
  const [paymentMode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleFinalFormSubmit = (values: any) => {
    const { ...payment } = values;

    if (!payment.id) {
       let newPayment = {
         ...payment,
         id: uuid()
       };
       createPayment(newPayment);
    } else {
      editPayment(values);
    }
   
  };

  const handleSearchChange = (keyword: any) => {
    if (keyword !== '') {
      searchClient(keyword);
    }
  };

  const handleResultSelect = (clientid: any) => {
    loadClientProperties(clientid);
  };

  // const timeElapsed = Date.now();
  // const today = new Date(timeElapsed);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadPayment(match.params.id)
        .then(payment => setPayment(new PaymentFormValues(payment)))
        .finally(() => setLoading(false));
      }

    loadTransactionTypes();
  }, [loadTransactionTypes, match.params.id]);

  return (
    <Grid>
      <Grid.Column width={12}>
        {match.params.id ? (
          <h2>Edit Payment - {`#${payment.sequenceNo}`}</h2>
        ) : (
          <h2>New Payment</h2>
        )}

        <FinalForm
          validate={validate}
          initialValues={payment}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              {!match.params.id && (
                <Segment>
                  <Search
                    onResultSelect={(e, { result }) =>
                      handleResultSelect(result.id)
                    }
                    onSearchChange={(e, data) => handleSearchChange(data.value)}
                    results={searchResults}
                    loading={loadingSearch}
                    placeholder="Search..."
                    size="large"
                  />
                  <Form.Group>
                    {/* <Field
                      basic
                      width={8}
                      name="clientName"
                      label="Client Name"
                      placeholder="Client Name"
                      value={payment.oRNumber}
                      component={TextInput}
                    /> */}
                    {/* <Field
                      basic
                      width={8}
                      name="clientName"
                      placeholder="Search..."
                      label="Client Name"
                      results={roleRegistry}
                      component={SearchInput}
                      onSearchChange={(e: any, { result }: any) => a(result.id)}
                    /> */}

                    {/* <Field
                      width={8}
                      name="property"
                      label="Property"
                      placeholder="Property"
                      // value={payment.ORNumber}
                      component={TextInput}
                    /> */}

                    {/* <Field
                      width={8}
                      name="property"
                      label="Property"
                      placeholder="Property"
                      options={clientProperties}
                      // value={payment.ORNumber}
                      component={SelectInput}
                    /> */}
                  </Form.Group>
                  <Form.Group>
                    {/* <Field
                      fluid
                      width={8}
                      name="transactionSequenceNo"
                      label="Transaction No."
                      placeholder="Transaction Number"
                      component={TextInput}
                    /> */}
                    <Field
                      width={8}
                      date={true}
                      name="dateOfPayment"
                      label="Date of Payment"
                      // placeholder={today.toLocaleDateString()}
                      placeholder="MM/DD/YYYY"
                      // value={payment.dateOfPayment}
                      component={DateInput}
                    />
                    <Field
                      width={8}
                      name="transactionSequenceNo"
                      label="Property"
                      placeholder="Property"
                      options={clientProperties}
                      //value={payment.oRNumber}
                      component={SelectInput}
                    />
                  </Form.Group>
                </Segment>
              )}

              <Segment>
                {match.params.id && (
                  <Field
                    width={8}
                    date={true}
                    name="dateOfPayment"
                    label="Date of Payment"
                    // placeholder={today.toLocaleDateString()}
                    placeholder="MM/DD/YYYY"
                    // value={payment.dateOfPayment}
                    component={DateInput}
                  />
                )}
                <Form.Group>
                  <Field
                    width={8}
                    name="orNumber"
                    label="AR Number"
                    placeholder="AR Number"
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

                <Header as="h4">Type of Payment:</Header>
                <Form.Group>
                  <Field
                    name="typeOfPayment"
                    label="Reservation"
                    type="radio"
                    value="Reservation"
                    id="Reservation"
                    onClick={() => setDisable(true)}
                    component={RadioInput}
                  />
                  <Field
                    name="typeOfPayment"
                    label="Amortization"
                    type="radio"
                    value="Amortization"
                    id="Amortization"
                    onClick={() => setDisable(false)}
                    component={RadioInput}
                  />
                </Form.Group>

                <Header as="h4">Mode of Payment:</Header>
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
                    onClick={() => setPaymentMode('Cheque')}
                    component={RadioInput}
                  />
                  <Field
                    name="modeOfPayment"
                    label="Online Transfer(Gcash, Paymaya, Paypal, Online Banking)"
                    type="radio"
                    value="Online Transfer"
                    id="Online Transfer"
                    onClick={() => setDisable(false)}
                    component={RadioInput}
                  />
                  <OnChange name="modeOfPayment">
                    {(value: any, previous: any) => {
                      setPaymentMode(value);
                    }}
                  </OnChange>
                </Form.Group>

                {/* <h4>Mode of Payment:</h4>
                <Field
                  name="typeOfPayment"
                  label="Reservation"
                  type="radio"
                  value="Reservation"
                  id="Reservation"
                  onClick={() => setDisable(true)}
                  component={RadioInput}
                />
                <Field
                  name="typeOfPayment"
                  label="Amortization"
                  type="radio"
                  value="Amortization"
                  id="Amortization"
                  onClick={() => setDisable(false)}
                  component={RadioInput}
                /> */}

                {/* <Form.Group>
                  <h4>Mode of Payment:</h4>
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
                </Form.Group> */}

                {paymentMode === 'Cheque' && (
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
                )}

                {paymentMode === 'Online Transfer' && (
                  <Form.Group>
                    <Field
                      disabled={disable}
                      width={8}
                      name="bankName"
                      label="Payment Mode"
                      placeholder="Payment Mode"
                      value={payment.bankName}
                      component={TextInput}
                    />
                  </Form.Group>
                )}
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
};

export default observer(PaymentForm);
