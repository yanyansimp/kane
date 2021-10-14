import React, { Fragment, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { Button, Card, Grid,Header,Icon, Input, Segment} from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import AddPropertyForm from './AddpropertyForm'
import PropertyTable from './PropertyTable';

const cardStyle = {
  padding: '15px',
  borderRadius: '20px',
  width: '260px',
};
const searchBar = {
  left: '450px',
  width: '100%'
};

const PropertyForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {getpPropertyTypes} = rootStore.propertyTypeStore;
  const [propertyTypes, setPropertyTypes] = useState([])
  const [step, setStep] = useState(0);
  const propFunc = (prop: any) => {
      setPropertyTypes(prop)
  }
  useEffect(() => {
      getpPropertyTypes(propFunc)
  }, [getpPropertyTypes]);
 
  return (
    // <Grid>
    //     <h2>PROPERTY INFO</h2>
    //     <Grid.Column width={16}>
    //     <Button  floated="right" onClick={() => setStep(1)}>
    //       <Icon name='plus' />
    //       Add Property
    //     </Button>
    //     </Grid.Column>
    //     {step == 0 &&  <PropertyTable/>}
    //     {step == 1 && <AddPropertyForm/>}
    // </Grid>

    <Grid>
      <Grid.Column>
        <Segment clearing basic>
          <Header as="h2" floated="left">
            Property
          </Header>
          <Button floated="right" onClick={() => setStep(1)}>
            <Icon name="plus" />
            Add Property
          </Button>
        </Segment>
        <Fragment>
          {step == 0 && <PropertyTable />}
          {step == 1 && <AddPropertyForm />}
        </Fragment>
      </Grid.Column>
    </Grid>
  );
}

export default PropertyForm


