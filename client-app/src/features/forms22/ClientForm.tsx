import React, { useContext, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import {
  Container,
  Segment,
  Header,
  Label,
  Input,
  Menu,
  Button,
  Form,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import DateInput from '../../app/common/form/DateInput';

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

const ClientForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment className="Clientmasthead" >
        <h1><label>Buyer's Information</label></h1>
       <Segment className="Clientmasthead1"> 
        <div className="Clientmasthead1">
      {/* <Container text className='1stbox'> */}
      <FinalForm 
        onSubmit={() => {}}
        render={({handleSubmit, pristine, invalid}) => (
          <Form>
           
            <Form.Group widths='equal' > 
                <Form.Input fluid label='Block No.' placeholder='Block No.' ></Form.Input>
                <Form.Input fluid label='Lot No.' placeholder='Lot No.' ></Form.Input>
                <Form.Input fluid label='Lot Area' placeholder='Lot Area' ></Form.Input>
                <Form.Input fluid label='Email Address' placeholder='Email Address' ></Form.Input>
                {/* <Field fluid label='Date Reservation' placeholder='Date Reservation' /> */}
              
            </Form.Group>
            
            {/* Date Reservation */}
            <Form.Group widths='equal' style={{ marginRight:'0em'}}> 
            <Form.Input fluid label='Project Area' placeholder='Project Area' ></Form.Input>
            {/* < Form.Input fluid label='Email Address' placeholder='Email Address' style={{width:"55em"}}></Form.Input> */}
            <Field 
                    fluid
                    width={8}
                    date={true}
                    label="Date of Birth"
                    name="date"
                    placeholder="Date"
                    component={DateInput}
                    style={{marginTop:"12em", float:"left"}}
                  />
                  
                  </Form.Group>
            <Form.Group widths='equal'>
            < Form.Input fluid label='Project Area' placeholder='Project Area'></Form.Input>
                <Form.Input fluid label='Network' placeholder='Network'></Form.Input>
                <Form.Input fluid label='Sales Agent' placeholder='Sales Agent'></Form.Input>
                <Form.Input fluid label='Sales Manager' placeholder='Sales Manager'></Form.Input>
            </Form.Group>
        </Form>
        )}
      />
      {/* </Container> */}
      </div>
       </Segment> 
      <h1><label>Personal Information</label></h1>
      <Segment className="Clientmasthead2">
      {/* <Container text> */}
      <div className="Clientmasthead1">
      <FinalForm 
        onSubmit={() => {}}
        render={({handleSubmit, pristine, invalid}) => (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Last Name' placeholder='Last Name'></Form.Input>
                <Form.Input fluid label='First Name' placeholder='First Name'></Form.Input>
                <Form.Input fluid label='Middle Name' placeholder='Middle Name'></Form.Input>
                <Form.Input fluid label='TIN No.' placeholder='TIN No.'></Form.Input>
            </Form.Group>
        
            <Form.Group widths='equal'>
            
                {/* <Form.Input fluid label='Birth Date' placeholder='Birth Date'></Form.Input> */}
                <Field 
                    fluid
                    width={15}
                    date={true}
                    label="Date of Birth"
                    name="date"
                    placeholder="Date"
                    component={DateInput}
                    style={{marginTop:"12em", float:"left"}}
                  />
                <Form.Input fluid label='Age' placeholder='Age'></Form.Input>
                <Form.Select fluid label='Gender' options={options} placeholder='Gender'></Form.Select>
                <Form.Input fluid label='Civil Status' placeholder='Civil Status'></Form.Input>
            </Form.Group>
        
            <Form.Group widths='equal'>
                <Form.Input fluid label='Religion' placeholder='Religion'></Form.Input>
                <Form.Input fluid label='Zip Code' placeholder='Zip Code'></Form.Input>
                <Form.Input fluid label='Contact Number' placeholder='Contact Number'></Form.Input>
            </Form.Group>
        
        <Form.Checkbox fluid label='SPOUSE INFORMATION:(Please check if applicable)'></Form.Checkbox>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Last Name' placeholder='Last Name'></Form.Input>
                <Form.Input fluid label='First Name' placeholder='First Name'></Form.Input>
                <Form.Input fluid label='Middle Name' placeholder='Middle Name'></Form.Input>
            </Form.Group>

            <Form.Group widths='equal'>
                {/* <Form.Input fluid label='Birth Date' placeholder='Birth Date'></Form.Input> */}
                <Field 
                    fluid
                    width={15}
                    date={true}
                    label="Date of Birth"
                    name="date"
                    placeholder="Date"
                    component={DateInput}
                    style={{marginTop:"12em", float:"left"}}
                  />
                <Form.Input fluid label='Age' placeholder='Age'></Form.Input>
                <Form.Select fluid label='Gender' options={options} placeholder='Gender'></Form.Select>
                <Form.Input fluid label='TIN No.' placeholder='TIN No.'></Form.Input>
            </Form.Group>
          <div className="ClientButton">
            <Form.Group className="Clientbutton1">
                <Button style={{width:'10em'}}
                        color="grey"
                        content="Cancel"
                        fluid
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Next"
                        fluid
                        as={NavLink}
                        to='/forms2'
                >
                    
                    </Button>
          </Form.Group>
          </div>    
        </Form>
        )}
        />
        </div>
      {/* </Container> */}
    
    </Segment>
    </Segment>
    
  );
};

export default ClientForm;
