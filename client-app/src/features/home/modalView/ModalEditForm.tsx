import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Image, Modal, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { combineValidators } from 'revalidate';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload';
import { RootStoreContext } from '../../../app/stores/rootStore';
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
const ModaView:  React.FC<IfirstChildProps> = ({name}) => {
  console.log(name)
  
  const [loading, setLoading] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { homepage,submitting, EditLandingPage } = rootStore.homePageStore;
  const handleFinalFormSubmit = (values: any) => {
    const { ...homepage } = values;
    let newhomepage = {
      id: name.id,
      ...homepage,
      isMain: 'Body'
    }
    EditLandingPage(newhomepage);
  };
  return (
    <Grid>
      <Grid>
        <Header>EDIT OF SLIDER IMSAGE</Header>
        <Segment clearing>
            <FinalForm 
              validate={validate}
              onSubmit={handleFinalFormSubmit}
              render={({handleSubmit, invalid, pristine})=>(
                <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                    name="name"
                    label="Body Name or title of Images  "
                    placeholder={name.name}
                    value={homepage?.name}
                    component={TextInput}
                    
                />
                <Field
                    name="description"
                    label="Body Description of Images "
                    placeholder={name.description}
                    value={homepage?.name}
                    component={TextInput}
                   
                />
                <Field
                    name="url"
                    label="Body Description  "
                    placeholder="Description"
                    value={homepage?.url}
                    component={PhotoUpload}
                />
                <Button
                    loading={submitting}
                    disabled={loading || invalid || pristine}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    />
                    <Button
                    disabled={loading}
                    floated="right"
                    type="button"
                    content="Cancel"
                    />
            </Form>   
              )}
            />
        </Segment>
      </Grid>
    </Grid>
  )
}

export default ModaView
