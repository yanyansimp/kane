import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload';
import { v4 as uuid } from 'uuid'; 
import { RootStoreContext } from '../../../app/stores/rootStore';
const validate = combineValidators({})

const BodyClass = () => {
    const [loading, setLoading] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { homepage,submitting, createLandingPage,EditLandingPage } = rootStore.homePageStore;
    const handleFinalFormSubmit = (values: any) => {
      const { ...homepage } = values;
      let newhomepage = {
        id:uuid(),
        ...homepage,
        isMain: 'Body'
      }
      createLandingPage(newhomepage);
    };
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing>
                <h1><label>Slider Image  view</label></h1>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine}) =>(
                        <Form onSubmit={handleSubmit} loading={loading}>
                            <Field
                                name="name"
                                label="Body Name or title of Images  "
                                placeholder="Name"
                                component={TextInput}
                            />
                            <Field
                                name="description"
                                label="Body Description of Images "
                                placeholder="Description"
                                component={TextInput}
                            />
                            <Field
                                name="image"
                                label="Body Description  "
                                placeholder="Description"
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
          >
          </FinalForm>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default BodyClass
