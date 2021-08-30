import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Input, Segment } from 'semantic-ui-react'
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
import { makeStyles } from '@material-ui/core';
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
const searchBar = {
  left: '370px',
  width: '40%',
  height: '3.5rem',
};

const container = {
  backgroundColor: 'transparent',
  border: 'transparent',
  display: 'grid',
  width: '25%',
  position: 'relative',
  zIndex: 5
};
const useStyles = makeStyles({
  newTransaction: {
    position: 'relative',
    left: '2px',
    top: '15px',
},
})

const PaymentForm = () => {
  const classes = useStyles()
  const rootStore = useContext(RootStoreContext);
  const { submitting, loadTransactionTypes,  transactionTypeRegistry} = rootStore.transactionTypeStore;
  const { roleRegistry, user } = rootStore.userStore
  const { createPayment } = rootStore.paymentStore;
  const [payment, settransactionType] = useState(new PaymentFormValues());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [disable, setDisable] = React.useState(true);
  const handleFinalFormSubmit = (values: any) => {
    const { ...payment } = values;
    let newPayment = {
      id: uuid(), 
      ...payment,
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
                          <Form.Group>
                            <Field
                              width={2}
                              name="ORNumber"
                              label="OR Number."
                              placeholder="OR Number"
                              value={payment.ORNumber}
                              component={TextInput}
                            />
                          <Input
                            width={10}
                            style={searchBar}
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>{
                                setSearchTerm(e.target.value);
                            }}
                            placeholder="search"
                            icon='search'
                          />
                          </Form.Group>
                          
                <Form.Group>
                  <Field 
                    width={8}
                    name="TransactionType"
                    label="Transaction Type"
                    placeholder="Transaction Type"
                    value={transactionTypeRegistry}
                    options={transactionTypeRegistry}
                    component={SelectInput}
                    // onchange={handleDropDownSelectPropertyType}
                  />
                  <div className={classes.newTransaction}><TransactionType/></div>
                  <Field
                    width={6}
                    date={true}
                    name="DateOfPayment"
                    label="Date"
                    placeholder={today.toLocaleDateString()}
                    value={payment.DateOfPayment}
                    component={DateInput}
                />
                </Form.Group>
                <Form.Group>
                <Field
                    width={8}
                    name="ReceivedFrom"
                    label="Received From."
                    placeholder={user?.lastName}{...user?.firstName}
                    // value={user?.lastName}{...user?.firstName}
                    component={TextInput}
                  />
                  <div className={classes.newTransaction}><NewClient/></div>
                  <Field
                    width={6}
                    name="AccountNo"
                    label="Account No."
                    placeholder="Account No"
                    // value={payment.AccountNo}
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                <Field
                    width={10}
                    name="Address"
                    label="Address."
                    placeholder="Address"
                    // value={payment.Address}
                    component={TextInput}
                  />
                  <Field
                    width={6}
                    name="MobileNo"
                    label="Mobile No."
                    placeholder="Mobile No"
                    // value="MobileNo"
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
                              value={"Check"}
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
                                with={6}
                                name="CheckNo"
                                placeholder="Check No"
                                value={payment.CheckNo}
                                component="input"
                              />
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                                disabled={disable}
                                with={6}
                                name="BankName"
                                placeholder="BankName"
                                value={payment.BankName}
                                component="input"
                              />
                          </Grid.Column>
                          <Grid.Column>
                            <Field 
                                disabled={disable}
                                with={6}
                                name="Branch"
                                placeholder="Branch"
                                value={payment.Branch}
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
                                  value={payment.InPaymentOf}
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
                                  name="Amount"
                                  placeholder="Payment Amount"
                                  value={payment.Amount}
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
                              // value="AmountInWords"
                              component={TextInput}
                            />
                            <Field
                              width={6}
                              name="Total"
                              label="Total."
                              placeholder="Total"
                              value={payment.Total}
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
      <Grid.Column with={4} style={container}>
        <Segment>
        <h1>Hell World</h1>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default PaymentForm
