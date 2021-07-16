import React, { useContext, Fragment } from 'react';
import {
  Container,
  Segment,
  Header,
  Button,
  Form,
  Grid,
  Image,
  Dropdown,
  Input,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import DateInput from '../../app/common/form/DateInput';
import { Form as FinalForm, Field } from 'react-final-form';

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

const CategoryInfo = [
  {key: 'yi', text: 'Your Information', value: 'yourinfo'},
  {key: 'si', text: 'Spouse Information', value: 'spouseinfo'},
  {key: 'ci', text: 'Co-Borrower Information', value: 'coinfo'},
]

const ClientForm4 = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment className="Clientmasthead" >
    
      <Header><h1><label>FINANCIAL REFERENCES</label></h1></Header>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
    <Form>
      <div>
        111
      <Grid divided='vertically'>
      <Grid.Row columns={4} className='C4'>
    <Grid.Column>
            
    </Grid.Column>

    <Grid.Column>
          <label>Principal Information</label>
    </Grid.Column>

    <Grid.Column>
           <label>Spouse Information</label>
    </Grid.Column>
      
    <Grid.Column>
          <label>Co-Borrower Information</label>
     </Grid.Column>
      
       </Grid.Row>
    <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
                Gross Salary
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Principal Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Spouse Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Co-Borrower Information'></Form.Input>
          </Grid.Column>
      </Grid.Row>

          <Grid.Row columns={4}>
          <Grid.Column>
                <label>Grand Total</label>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Principal Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Spouse Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Co-Borrower Information'></Form.Input>
          </Grid.Column>
          </Grid.Row>
    
  </Grid>
  </div>
  </Form>
  </Segment>

  <Header><h1><label>PERSONNAL REFERENCES</label></h1></Header>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
    <Form>
      <div>
        
      <Grid divided='vertically'>
      <Grid.Row columns={4} className='C4'>
    <Grid.Column>
            <label>Name</label>  
    </Grid.Column>

    <Grid.Column>
          <label>Relationship to Buyer</label>
    </Grid.Column>

    <Grid.Column>
           <label>Address</label>
    </Grid.Column>
      
    <Grid.Column>
          <label>Contact Number</label>
     </Grid.Column>
      
       </Grid.Row>
    <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
            <Form.Input fluid placeholder='Name'></Form.Input>
            <Form.Input fluid placeholder='Name'></Form.Input>
            <Form.Input fluid placeholder='Name'></Form.Input>
            <Form.Input fluid placeholder='Name'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Relationship to Buyer'></Form.Input>
                <Form.Input fluid placeholder='Relationship to Buyer'></Form.Input>
                <Form.Input fluid placeholder='Relationship to Buyer'></Form.Input>
                <Form.Input fluid placeholder='Relationship to Buyer'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Address'></Form.Input>
                <Form.Input fluid placeholder='Address'></Form.Input>
                <Form.Input fluid placeholder='Address'></Form.Input>
                <Form.Input fluid placeholder='Address'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Contact Number'></Form.Input>
                <Form.Input fluid placeholder='Contact Number'></Form.Input>
                <Form.Input fluid placeholder='Contact Number'></Form.Input>
                <Form.Input fluid placeholder='Contact Number'></Form.Input>
          </Grid.Column>
      </Grid.Row>

  </Grid>
  
  
      </div>
      <Form.Group className="ClientButton">
                <Button style={{width:'10em'}}
                        color="grey"
                        content="Cancel"
                        fluid
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Back"
                        fluid
                        as={NavLink}
                        to='/forms4'
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Save"
                        fluid
                        
                />
          </Form.Group>
      </Form>
    </Segment>
    
    </Segment>  
       
     
   
    
  );
};

export default ClientForm4;
