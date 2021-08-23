import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import SelectInput from '../../app/common/form/SelectInput';
import TransactionType from './modal/modalTransactionType'
import NewClient from './modal/modalNewClient'
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput'
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { PaymentFormValues } from '../../app/models/payment';
import { v4 as uuid } from 'uuid';
const validate = combineValidators({
  TransactionType: isRequired('Transaction'),
  ReceivedFrom:isRequired('Receiver'),
  AccountNo:isRequired('Account No'),
  Address:isRequired('Address'),
  MobileNo:isRequired('Mobile No'),
  CheckNo:isRequired('CheckNo No'),
  Bank:isRequired('Bank'),
  Branch:isRequired('Branch'),
  InPaymentOf:isRequired('Payment'),
  PaymentAmount:isRequired('Amount'),

});


const PaymentForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { submitting, loadTransactionTypes, transactionTypeRegistry} = rootStore.transactionTypeStore;
  const { createPayment } = rootStore.paymentStore;
  const [payment, settransactionType] = useState(new PaymentFormValues());
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = React.useState(true);
  const handleFinalFormSubmit = (values: any) => {
    const { ...payment } = values;
    let newPayment = {
      id: uuid(), 
      ...payment
    }
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
      <h2>Payment</h2>
      <Segment clearing>
        <FinalForm
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine}) => (
            <Form onSubmit={handleSubmit} loading={loading}>
                <Form.Group widths="equal">
                  <Field 
                    name="TransactionType"
                    label="Transaction Type"
                    placeholder="Transaction Type"
                    value="TransactionType"
                    options={transactionTypeRegistry}
                    component={SelectInput}
                    // onchange={handleDropDownSelectPropertyType}
                  />
                  <div><TransactionType/></div>
                  <Field
                    date={true}
                    name="Date"
                    label="Date"
                    placeholder={today.toLocaleDateString()}
                    // value={payment.DateOfPayment}
                    component={DateInput}
                />
                </Form.Group>
                <Form.Group widths="equal">
                <Field
                    name="ReceivedFrom"
                    label="Received From."
                    placeholder="Received From"
                    // value={payment.ReceivedById}
                    component={TextInput}
                  />
                  <div><NewClient/></div>
                  <Field
                    name="AccountNo"
                    label="Account No."
                    placeholder="Account No"
                    // value={payment.ReceivedById}
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                <Field
                    width={10}
                    name="Address"
                    label="Address."
                    placeholder="Address"
                    value="Address"
                    component={TextInput}
                  />
                  <Field
                    width={6}
                    name="MobileNo"
                    label="Mobile No."
                    placeholder="Mobile No"
                    value="MobileNo"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                </Form.Group>
                  <Grid divided='vertically'>
                     <Grid.Row columns={3}>
                      <Grid.Column>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                          <div><Header style={{width:'20em'}}>Payment Type</Header></div>
                            <Field 
                              name="ModeOfPayment"
                              component="input"
                              type="radio"
                              value="Cash"
                              id="Cash"
                              onClick={() => setDisable(true)}
                            />
                            <label >
                              Cash
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                              name="ModeOfPayment"
                              component="input"
                              type="radio"
                              value="Check"
                              id="Check"
                              onClick={() => setDisable(false)}
                            />
                            <label >
                              Check
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                                disabled={disable}
                                style={{width:'15em'}}
                                name="CheckNo"
                                placeholder="Check No"
                                value="CheckNo"
                                component="input"
                              />
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                                disabled={disable}
                                style={{width:'15em'}}
                                name="Bank"
                                placeholder="Bank"
                                value="Bank"
                                component="input"
                              />
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                                disabled={disable}
                                style={{width:'15em'}}
                                name="Branch"
                                placeholder="Branch"
                                value="Branch"
                                component="input"
                              />
                          </Grid.Column >
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Row columns={2}>
                          <Grid.Column>
                          <div><Header style={{width:'15em'}}>In Payment of</Header></div>
                            <Field 
                                  style={{right:"12"}}
                                  with={60}
                                  name="InPaymentOf"
                                  placeholder="In Payment of"
                                  value="InPaymentOf"
                                  component={TextAreaInput}
                                />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                          <div><Header style={{width:'15em'}}>Payment Amount</Header></div>
                            <Field 
                                  style={{right:"12"}}
                                  with={60}
                                  name="PaymentAmount"
                                  placeholder="Payment Amount"
                                  value="Amount"
                                  component={TextAreaInput}
                                />
                          </Grid.Column>
                        </Grid.Row>
                  </Grid.Row>
                  </Grid>
                  <Form.Group>
                          <Field
                              width={10}
                              name="AmountInWords"
                              label="Amount in Words."
                              placeholder="Amount in Words"
                              value="AmountInWords"
                              component={TextInput}
                            />
                            <Field
                              width={6}
                              name="Amount"
                              label="Total."
                              placeholder="Total"
                              value="Total"
                              component={TextInput}
                            />
                  </Form.Group>
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
      </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default PaymentForm
