import React from 'react'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import AddSalesTab from './AddSales'
import ExpensesTab from './ExpensesForm'
import AddSalesForm from './AddSalesForm'

const panes = [
    { menuItem: 'SALES INVOICE', render: () => <Tab.Pane> <AddSales/> </Tab.Pane> },
    { menuItem: 'EXPENSES', render: () => <Tab.Pane><ExpensesForm/></Tab.Pane> },
    { menuItem: 'NEW PAYMENT', render: () => <Tab.Pane><AddSalesFormNew/></Tab.Pane> },
  ]


  const AddSales = () => (
    <AddSalesTab/>
  )
  const ExpensesForm = () => (
    <ExpensesTab/>
  )
  const AddSalesFormNew = () => (
    <p>hello</p>
    // <AddSalesForm/>
  )



const PaymentForm = () => {
    
        return (
            <Grid>
              <Grid.Column width={12}>
                <h1>Add Sales</h1>
                <Tab menu={{ fluid: true, Horizontal:true, tabular: 'right' }} panes={panes} />
              </Grid.Column>
            </Grid>
          );
    
}

export default PaymentForm
