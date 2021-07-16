import React, { useContext, Fragment, Component } from 'react';
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

  

const ClientForm3 = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment className="Clientmasthead" >
    
      <Header><h1><label>Work Information</label></h1></Header>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
    <Form>
    {/* <Form.Group widths='equal'>
        Category Information
        <Dropdown placeholder='Information' fluid multiple selection options={CategoryInfo} />
    </Form.Group> */}
      <div>
        
      <Grid divided='vertically'>
    <Grid.Row columns={4}>
    <Grid.Column>
    
    </Grid.Column>

    <Grid.Column>
          <label>Personal Information</label>
    </Grid.Column>

    <Grid.Column>
           <label>Spouse Information</label>
    </Grid.Column>
      
    <Grid.Column>
          <label>Co-Borrower Information</label>
     </Grid.Column>
      
       </Grid.Row>

    <Grid.Row columns={4}>
      <Grid.Column>
         Employment Status
      </Grid.Column>
      <Grid.Column>
          <Grid.Row columns={2}>
              <Grid.Column>
                  <Form.Checkbox fluid label='Locally Employed'></Form.Checkbox>
              </Grid.Column>
              <Grid.Column>
                   <Form.Radio fluid label='Private'></Form.Radio>
                  <Form.Radio fluid label='Government'></Form.Radio>            
              </Grid.Column>
          </Grid.Row>

          
        <Form.Group widths='equal'>
            
           
         </Form.Group>

        <Form.Checkbox fluid label='Self-Employed'></Form.Checkbox>
        <Form.Checkbox fluid label='OFW'></Form.Checkbox>

        <Grid.Row columns={1}>
            <Form.Radio fluid label='Sea Based'></Form.Radio>
            <Form.Radio fluid label='Land Based'></Form.Radio>
        </Grid.Row>
      </Grid.Column>

      <Grid.Column>
        <Form.Checkbox fluid label='Locally Employed'></Form.Checkbox>
       
         <Grid.Row columns={1}>
            <Form.Radio fluid label='Private'></Form.Radio>
            <Form.Radio fluid label='Government'></Form.Radio>
         </Grid.Row>
        
        <Form.Checkbox fluid label='Self-Employed'></Form.Checkbox>
        <Form.Checkbox fluid label='OFW'></Form.Checkbox>

        <Grid.Row columns={1}>
            <Form.Radio fluid label='Sea Based'></Form.Radio>
            <Form.Radio fluid label='Land Based'></Form.Radio>
        </Grid.Row>
      </Grid.Column>

      <Grid.Column>
        <Form.Checkbox fluid label='Locally Employed'></Form.Checkbox>
       
         <Grid.Row columns={1}>
            <Form.Radio fluid label='Private'></Form.Radio>
            <Form.Radio fluid label='Government'></Form.Radio>
         </Grid.Row>
        
        <Form.Checkbox fluid label='Self-Employed'></Form.Checkbox>
        <Form.Checkbox fluid label='OFW'></Form.Checkbox>

        <Grid.Row columns={1}>
            <Form.Radio fluid label='Sea Based'></Form.Radio>
            <Form.Radio fluid label='Land Based'></Form.Radio>
        </Grid.Row>
      </Grid.Column>

    </Grid.Row>
  </Grid>
  
  
      </div>
      </Form>
    </Segment>
    
    <Form.Checkbox fluid label='FOR BUSINESS OWNERS : (Please check if applicable)'></Form.Checkbox>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
      <div>
      <FinalForm 
        onSubmit={() => {}}
        render={({handleSubmit, pristine, invalid}) => (
        <Form>
        <Grid divided='vertically'>
        <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
                Business Name
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
                <label>Location of Business</label>
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
          <Grid.Column>
                <label>Business Type</label>
          </Grid.Column>
          <Grid.Column>  
                <Form.Checkbox fluid label='Single Proprietorship'></Form.Checkbox>
                <Form.Checkbox fluid label='Partnership'></Form.Checkbox>
                <Form.Checkbox fluid label='Corporation'></Form.Checkbox>
          </Grid.Column>
          <Grid.Column>  
          <Form.Checkbox fluid label='Single Proprietorship'></Form.Checkbox>
                <Form.Checkbox fluid label='Partnership'></Form.Checkbox>
                <Form.Checkbox fluid label='Corporation'></Form.Checkbox>
          </Grid.Column>
          <Grid.Column>  
          <Form.Checkbox fluid label='Single Proprietorship'></Form.Checkbox>
                <Form.Checkbox fluid label='Partnership'></Form.Checkbox>
                <Form.Checkbox fluid label='Corporation'></Form.Checkbox>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column widths='1em'>
                Industry
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
                Date of Establishment
          </Grid.Column>
          <Grid.Column>  
          <Field
                    fluid
                    width={18}
                    date={true}
                    // label="Date Establishment"
                    name="date"
                    placeholder="Date of Establishment"
                    component={DateInput}
                  />
          </Grid.Column>
          <Grid.Column>  
          <Field
                    fluid
                    width={18}
                    date={true}
                    // label="Date Establishment"
                    name="date"
                    placeholder="Date of Establishment"
                    component={DateInput}
                  />
          </Grid.Column>
          <Grid.Column>  
          <Field
                    fluid
                    width={18}
                    date={true}
                    // label="Date Establishment"
                    name="date"
                    placeholder="Date of Establishment"
                    component={DateInput}
                  />
          </Grid.Column>
        </Grid.Row>

        </Grid>

        
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
                        to='/forms2'
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Next"
                        fluid
                        as={NavLink}
                        to='/forms4'
                />
          </Form.Group>
        </Form>
           )}
           />
        </div>
      {/* </Container> */}
    </Segment>
    </Segment>
    
  );
};

export default ClientForm3;
