import React, { useState } from 'react'
import { Grid, Segment, Form, Button, Image, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

const validate = combineValidators({
    firstName: isRequired('First Name'),
    lastName: isRequired('Last Name'),
    ConTactNo: isRequired('ConTact No'),
    Email: isRequired('Email'),
    Messege: isRequired('Messege'),
  });
  
const Formvisitor = () => {
    const [loading, setLoading] = useState(false);
    const handleFinalFormSubmit = (values: any) => {
        const { ...user } = values;
      };
    return (
        <Grid>
            <Grid.Column width={6}>
            <Image
                src="/assets/logo/LogoBlackGold.svg"
                alt="logo"
                style={{ width: '150px' }}
            />
                <Header>Let's discuss!</Header>
            <h4>We would love to hear from you as soon as possible.</h4>
            <Segment clearing>
                <FinalForm 
                    validate={validate}
                    onSubmit={handleFinalFormSubmit}
                    render={({handleSubmit, invalid, pristine})=>(
                       <Form onSubmit={handleSubmit} loading={loading}>
                           <Form.Group>
                           <Field
                                width={8}
                                name="firstName"
                                label="First Name"
                                placeholder="First Name"
                                // value={user.firstName}
                                component={TextInput}
                            />
                           <Field
                                width={8}
                                name="lastName"
                                label="Last Name"
                                placeholder="Last Name"
                                // value={user.lastName}
                                component={TextInput}
                            />
                           </Form.Group>
                           <Field
                                width={16}
                                name="ConTactNo"
                                label="ConTact No"
                                placeholder="ConTact No"
                                // value={user.lastName}
                                component={TextInput}
                            />
                            <Field
                                width={16}
                                name="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                // value={user.lastName}
                                component={TextInput}
                            />
                            <Field
                                width={16}
                                name="Messege"
                                label="Messege"
                                placeholder="Messege"
                                // value={user.lastName}
                                component={TextAreaInput}
                            />
                             <Button
                                // loading={submitting}
                                disabled={loading || invalid || pristine}
                                floated="right"
                                positive
                                type="submit"
                                content="Submit"
                                />
                       </Form>
                    )}
                />
            </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default Formvisitor
