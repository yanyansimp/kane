import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Image, Modal, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import { RootStoreContext } from '../../../../../app/stores/rootStore';
import TextInput from '../../../../../app/common/form/TextInput';
import { observer } from 'mobx-react-lite';
const validate = combineValidators({
  // firstName: isRequired('First Name'),
  // lastName: isRequired('Last Name'),
  // ConTactNo: isRequired('ConTact No'),
  // Email: isRequired('Email'),
  // Messege: isRequired('Messege'),
});
const propType = {
  margin:"1px 0",
  fontFamily: 'Times New Roman', 
}
interface IfirstChildProps {
    name: any,
  }
const ModalView:  React.FC<IfirstChildProps> = ({name}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    editAmenities,
    submitting, 
    loading,
  } = rootStore.amenitiesStore;
  
  
  const handleFinalFormSubmit = (values: any) => {
    const { ...amenities } = values;
    let newamenities = {
      id: name.id,
      ...amenities,
    }
    editAmenities(newamenities);
  };

  return (
    <Grid>
      <Grid.Column>
        <Header>EDIT AMENITIES</Header>
        <Segment clearing>
            <FinalForm 
              onSubmit={handleFinalFormSubmit}
              render={({handleSubmit, invalid, pristine})=>(
                <Form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    label="Amenities  "
                    placeholder={name.name}
                    // value={amenities?.name}
                    component={TextInput}
                />
                <Field
                    name="description"
                    label="Description"
                    placeholder={name.description}
                    // value={amenities?.name}
                    component={TextInput}
                />


                <Button
                    loading={submitting}
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

export default observer(ModalView);
