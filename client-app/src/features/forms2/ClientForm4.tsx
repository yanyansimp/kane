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

const CategoryPosition = [
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
    
      <Header><h1><label>FOR EMPLOYED AND OFW ONLY</label></h1></Header>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
      <FinalForm 
        onSubmit={() => {}}
        render={({handleSubmit, pristine, invalid}) => (
    <Form>
    
      <div>
        
      <Grid divided='vertically'>
      <Grid.Row columns={4} className='C4'>
    <Grid.Column>
            
    </Grid.Column>

    <Grid.Column>
          <label>Personnal Information</label>
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
                Company Name
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Personnal Information'></Form.Input>
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
                <label>Location of Work</label>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Country'></Form.Input>
                <Form.Input fluid placeholder='State/Province'></Form.Input>
                <Form.Input fluid placeholder='City/Municipality'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
          <Form.Input fluid placeholder='Country'></Form.Input>
                <Form.Input fluid placeholder='State/Province'></Form.Input>
                <Form.Input fluid placeholder='City/Municipality'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
          <Form.Input fluid placeholder='Country'></Form.Input>
                <Form.Input fluid placeholder='State/Province'></Form.Input>
                <Form.Input fluid placeholder='City/Municipality'></Form.Input>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
                Industry/Type of Work
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Personnal Information'></Form.Input>
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
                Date Employed
          </Grid.Column>
          <Grid.Column>  
                <Field
                    fluid
                    width={18}
                    date={true}
                    label="Date Reservation"
                    name="date"
                    placeholder="Date Employed"
                    component={DateInput}
                  />
          </Grid.Column>
          <Grid.Column>  
          <Field
                    fluid
                    width={18}
                    date={true}
                    label="Date Reservation"
                    name="date"
                    placeholder="Date Employed"
                    component={DateInput}
                  />
          </Grid.Column>
          <Grid.Column>  
          <Field
                    fluid
                    width={18}
                    date={true}
                    label="Date Reservation"
                    name="date"
                    placeholder="Date Employed"
                    component={DateInput}
                  />
          </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
                Profession
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Personnal Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Spouse Information'></Form.Input>
          </Grid.Column>
          <Grid.Column>  
                <Form.Input fluid placeholder='Co-Borrower Information'></Form.Input>
          </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4}>
          
          <Grid.Column widths='1em'>
                Position/Level
          </Grid.Column>
          <Grid.Column>  
                  <Form.Checkbox fluid label='Rank and File/Staff/Clerk'></Form.Checkbox>
                  <Form.Checkbox fluid label='Supervisor/Team Lead'></Form.Checkbox>
                  <Form.Checkbox fluid label='Manage/Director'></Form.Checkbox>
                  <Form.Checkbox fluid label='Executive Officer'></Form.Checkbox>
                  <Form.Checkbox fluid label='Professional e.g. Doctor,Lawyer, Engineer, etc.'></Form.Checkbox>
          </Grid.Column>
          <Grid.Column>  
                  <Form.Checkbox fluid label='Rank and File/Staff/Clerk'></Form.Checkbox>
                  <Form.Checkbox fluid label='Supervisor/Team Lead'></Form.Checkbox>
                  <Form.Checkbox fluid label='Manage/Director'></Form.Checkbox>
                  <Form.Checkbox fluid label='Executive Officer'></Form.Checkbox>
                  <Form.Checkbox fluid label='Professional e.g. Doctor,Lawyer, Engineer, etc.'></Form.Checkbox>
          </Grid.Column>
          <Grid.Column>  
                  <Form.Checkbox fluid label='Rank and File/Staff/Clerk'></Form.Checkbox>
                  <Form.Checkbox fluid label='Supervisor/Team Lead'></Form.Checkbox>
                  <Form.Checkbox fluid label='Manage/Director'></Form.Checkbox>
                  <Form.Checkbox fluid label='Executive Officer'></Form.Checkbox>
                  <Form.Checkbox fluid label='Professional e.g. Doctor,Lawyer, Engineer, etc.'></Form.Checkbox>
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
                        to='/forms3'
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Next"
                        fluid
                        as={NavLink}
                        to='forms5'
                        
                />
          </Form.Group>
      </Form>
      )}
      />
    </Segment>
    
      
       
     
    </Segment>
    
  );
};

export default ClientForm4;
