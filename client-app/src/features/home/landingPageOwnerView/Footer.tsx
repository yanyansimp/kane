import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from 'uuid'; 
const validate = combineValidators({})

const FooterClass = () => {
    const [loading, setLoading] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { homepage,submitting, createLandingPage,EditLandingPage } = rootStore.homePageStore;
    const handleFinalFormSubmit = (values: any) => {
      const { ...homepage } = values;
      let newhomepage = {
        //   id:uuid(),
            id: '868ade56-e15b-4531-af87-78a45bf2879d',
          ...homepage,
          isMain: 'Footer'
      }
      EditLandingPage(newhomepage);
    };
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing>
                    <h1><label>Footer Image </label></h1>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine}) =>(
                        <Form onSubmit={handleSubmit} loading={loading}>
                            <Field
                                name="name"
                                label="Footer Name  "
                                placeholder={homepage?.name}
                                component={TextInput}
                            />
                            <Field
                                name="description"
                                label="Footer Description  "
                                placeholder={homepage?.description}
                                component={TextInput}
                            />
                            <Field
                                name="image"
                                label="Footer Description  "
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

export default FooterClass
