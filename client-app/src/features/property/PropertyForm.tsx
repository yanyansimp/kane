import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import AddPropertyForm from './AddpropertyForm'
import Viewpropertyform from './Viewpropertyform'


const useStyles = makeStyles({
  btn: {
    width: '100%',
    height: '3rem',
    background: 'orange',
    color: '#fff',
    '&:hover':{
        color:'red'
    }
}
})

const panes = [
  { menuItem: 'PROPERTIES INFO', render: () => <Tab.Pane><TableDisabled/> </Tab.Pane> },
  { menuItem: 'ADD PROPERTY', render: () => <Tab.Pane><FormForProperty/></Tab.Pane> },
  { menuItem: 'TAB 3', render: () => <Tab.Pane><SampleForm/></Tab.Pane> },
]

// const IMAGES = () => (
//   <Image with='20' src='/assets/categoryImages/SiteDevelopmentPlan.jpg' fluid />
// )

const SampleForm = () => (
  
  <div>
    hello world
  </div>
  
)

const TableDisabled = () => (
  
  <Viewpropertyform/>
  
)

// class TimeNow extends React.Component {
//   state={
//     curTime : new Date().toLocaleString(),
//   }
//   render(){
//     return (
//       <div className="App">
//         <p >{this.state.curTime}</p>
//       </div>
//     );
//   }
// }

// // TAB 2 ADD PROPERTIES
const FormForProperty = () => (
  < AddPropertyForm/>
)



const PropertyForm = () => {
    return (
      <Grid>
        <Grid.Column width={12}>
          <h1>Property Form</h1>
          <Tab menu={{ fluid: true, Horizontal:true, tabular: 'right' }} panes={panes} />
        </Grid.Column>
      </Grid>
    );
}

export default PropertyForm
