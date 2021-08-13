import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import AddPropertyForm from './AddpropertyForm'
import Viewpropertyform from './Viewpropertyform'
import PropertyDashboard from './PropertyDashboard'

const container = {
  // top: '-250px',
  backgroundColor: 'transparent',
  border: 'transparent',
  display: 'grid',
  // right: '-820px',
  position: 'relative',
  zIndex: 5
};

const panes = [
  // { menuItem: 'PROPERTY DASHBOARD', render: () => <Tab.Pane style={container}><PropertyDashboardForm/></Tab.Pane> },
  { menuItem: 'PROPERTIES INFO', render: () => <Tab.Pane><TableDisabled/> </Tab.Pane> },
  { menuItem: 'ADD PROPERTY', render: () => <Tab.Pane><FormForProperty/></Tab.Pane> },
]
const PropertyForm = () => {
  return (

    <Grid>
      <Grid.Column width={12}>
          <h1>Property Form</h1>
          <Tab menu={{ fluid: true, Horizontal:true, tabular: 'right' }} panes={panes} />
      </Grid.Column>
      <Grid.Column with={4} style={container}>
          <PropertyDashboard/>
      </Grid.Column>
    </Grid>
  );
}
const TableDisabled = () => (
  <Viewpropertyform/>
)
// // TAB 2 ADD PROPERTIES
const FormForProperty = () => (
  <AddPropertyForm/>
)

export default PropertyForm
