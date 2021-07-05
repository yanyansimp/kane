import React from 'react'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import AddSales from './AddSales'
import Expenses from './ExpensesForm'

const panes = [
    { menuItem: 'SALES INVOICE', render: () => <Tab.Pane> <AddSalesForm/> </Tab.Pane> },
    { menuItem: 'EXPENSES', render: () => <Tab.Pane><ExpensesForm/></Tab.Pane> },
    { menuItem: 'TAB 3', render: () => <Tab.Pane>3</Tab.Pane> },
  ]


  const AddSalesForm = () => (
    <AddSales/>
  )
  const ExpensesForm = () => (
    <Expenses/>
  )



const PaymentForm = () => {
    
        return (
            <Grid>
              <Grid.Column width={12}>
                <Input placeholder='Search...' />
                <h1>Add Sales</h1>
                <Tab menu={{ fluid: true, Horizontal:true, tabular: 'right' }} panes={panes} />
              </Grid.Column>
            </Grid>
          );
    
}

export default PaymentForm
