import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { v4 as uuid } from 'uuid';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import SelectInput from '../../../../app/common/form/SelectInput';
import TextInput from '../../../../app/common/form/TextInput';

const Amenities = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPropertyTypes,
    propertyTypeRegistry,
    getPropertiesByAvailable,
    propertyRegistry,
  } = rootStore.propertyTypeStore;

  const {
    loadingInitial,
    loadProperties,
    // propertyRegistry,
    // getPropertiesByAvailable,
  } = rootStore.propertyStore;

  const {
    createAmenities, 
    submitting,
    loading,
  } = rootStore.amenitiesStore;

  useEffect(() => {
    loadPropertyTypes();
    loadProperties();
  }, [loadPropertyTypes, loadProperties]);

 
 

  const handleFinalFormSubmit = (values: any) => {
    const { ...amenities } = values;
    let newAmenities = {
      id: uuid(),
      ...amenities,
    }
    createAmenities(newAmenities);
  };

  return (
    <Grid>
       <Grid.Column>
      <Segment clearing>
        <h2>Amenities</h2>
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit}>
                  <Field
                      width={8}
                      label="Property Type"
                      loading={loadingInitial}
                      name="propertyTypeId"
                      placeholder="Property Type"
                      component={SelectInput}
                      options={propertyTypeRegistry}
                    />
                  <Field
                        label="Amenities"
                        name="name"
                        placeholder="Name"
                        component={TextInput}
                      />
                  <Field
                        label="Description"
                        name="description"
                        placeholder="Description"
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
  );
};

export default observer(Amenities);
