import React, { useContext, Fragment } from 'react';
import {
  Container,
  Segment,
  Header,
  Button,
  Form,
  Input,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

const ClientForm2 = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment className="Clientmasthead" >
    
      <Header><h1><label>Co-Borrower's Information</label></h1></Header>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
      <div>
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Last Name' placeholder='Last Name'></Form.Input>
                <Form.Input fluid label='First Name' placeholder='First Name'></Form.Input>
                <Form.Input fluid label='Middle Name' placeholder='Middle Name'></Form.Input>
            </Form.Group>
        
            <Form.Group widths='equal'>
                <Form.Input fluid label='Birth Date' placeholder='Birth Date'></Form.Input>
                <Form.Input fluid label='Age' placeholder='Age'></Form.Input>
                <Form.Select fluid label='Gender' options={options} placeholder='Gender'></Form.Select>
                <Form.Input fluid label='TIN No.' placeholder='TIN No.'></Form.Input>
            </Form.Group>
        </Form>
      {/* </Container> */}
      </div>
    </Segment>
    <h1><label>Attorney in Fact's Information</label></h1>
      <Segment className="Clientmasthead3">
      {/* <Container text> */}
      <div>
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Last Name' placeholder='Last Name'></Form.Input>
                <Form.Input fluid label='First Name' placeholder='First Name'></Form.Input>
                <Form.Input fluid label='Middle Name' placeholder='Middle Name'></Form.Input>
            </Form.Group>
        
            <Form.Group widths='equal'>
                <Form.Input fluid label='Birth Date' placeholder='Birth Date'></Form.Input>
                <Form.Input fluid label='Age' placeholder='Age'></Form.Input>
                <Form.Select fluid label='Gender' options={options} placeholder='Gender'></Form.Select>
                <Form.Input fluid label='TIN No.' placeholder='TIN No.'></Form.Input>
            </Form.Group>
        
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
                        to='/forms'
                />
                <Button style={{width:'10em'}}
                        color="teal"
                        content="Next"
                        fluid
                        as={NavLink}
                        to='/forms3'
                />
          </Form.Group>
        </Form>
        </div>
      {/* </Container> */}
    </Segment>
    </Segment>
    
  );
};

export default ClientForm2;
