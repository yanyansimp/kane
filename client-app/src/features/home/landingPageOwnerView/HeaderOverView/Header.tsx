import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../../app/common/form/TextInput';
import { RootStore, RootStoreContext } from '../../../../app/stores/rootStore';
import PhotoUpload from '../photoUpload/Header/PhotoUpload';
import { v4 as uuid } from 'uuid'; 
const validate = combineValidators({
    name: isRequired('Header Name'),
})

const HeaderClass = () => {
    const rootStore = useContext(RootStoreContext);
    const { submitting, homepage, loading, createLandingPage } = rootStore.homePageStore;
    const handleFinalFormSubmit = (values: any) => {
      const { ...homepage } = values;
      let newhomepage = {
        id: uuid(),
        ...homepage,
        isMain: 'Header'
      }
      createLandingPage(newhomepage);
    };
    return (
        <Grid>
            <Grid.Column>
                <Segment clearing>
                    <h1><label>Upper/Header Image </label></h1>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine}) =>(
                        <Form onSubmit={handleSubmit} loading={loading}>
                            <Field
                                name="name"
                                label="Header Name"
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
                            <Segment>
                                <h3>Photo</h3>
                                <PhotoUpload/>
                            </Segment>
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
