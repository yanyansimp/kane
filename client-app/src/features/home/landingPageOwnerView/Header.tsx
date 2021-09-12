import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload';
import { RootStore, RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from 'uuid'; 
const validate = combineValidators({})

const HeaderClass = () => {
    const [loading, setLoading] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { homepage,submitting, createLandingPage,EditLandingPage } = rootStore.homePageStore;
    const handleFinalFormSubmit = (values: any) => {
      const { ...homepage } = values;
      let newhomepage = {
        // id: uuid(),
        id: 'e867e465-aedb-4e0b-931e-56d01827ba92',
        ...homepage,
        isMain: 'Body'
      }
      EditLandingPage(newhomepage);
    };
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing>
                    <h1><label>Upper Image </label></h1>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine}) =>(
                        <Form onSubmit={handleSubmit} loading={loading}>
                            <Field
                                name="name"
                                label="Header Name  "
                                placeholder="Name"
                                value={homepage?.name}
                                component={TextInput}
                            />
                            <Field
                                name="description"
                                label="Header Description  "
                                placeholder="Description"
                                value={homepage?.description}
                                component={TextInput}
                            />
                            <Field
                                name="image"
                                label="Header image  "
                                placeholder="image"
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

export default HeaderClass
