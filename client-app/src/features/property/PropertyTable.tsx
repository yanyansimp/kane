import React, { useContext, useEffect, useState } from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';

const cardStyle = {
    padding: '15px',
    borderRadius: '20px',
    width: '260px',
  };
  const searchBar = {
    left: '450px',
    width: '100%'
  };
const PropertyTable = () => {
    const rootStore = useContext(RootStoreContext);
    const {getpPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setPropertyTypes] = useState([])
    const propFunc = (prop: any) => {
        setPropertyTypes(prop)
    }
    useEffect(() => {
        getpPropertyTypes(propFunc)
    }, [getpPropertyTypes]);
    return (
       <Grid>
            <Grid.Row width={16}>
          <Card.Group>
            {propertyTypes.map((propertyType) => {
              return (
                <Card style={cardStyle} raised href={`/propertyType/${propertyType[6]}`} >
                  <Card.Content>
                    <Card.Header> {propertyType[0]} </Card.Header>
                    <Card.Description> <Icon name="check" />AVAILABLE :&nbsp;{propertyType[3]} </Card.Description>
                    <Card.Description> <Icon name="file" /> RESERVED :&nbsp;{propertyType[4]} </Card.Description>
                    <Card.Description> <Icon name="key" /> OCCUPIED :&nbsp;{propertyType[5]} </Card.Description>
                  </Card.Content>
                  <Card.Content>
                    <Icon name="arrow up" /> {propertyType[2]}
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Grid.Row>
       </Grid>
    )
}

export default PropertyTable
