
import React, { useContext, useEffect, useState } from 'react'
import { Grid, Segment, Table, Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';

const UITemplate = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadProperties,getProperties} = rootStore.propertyStore;
    const [properties, setProperties] = useState([])
    const propFunc = (prop: any) => {
        setProperties(prop)
      }
      useEffect(() => {
        loadProperties()
        getProperties(propFunc)
      }, [getProperties]);
    return (
        <Grid>
        <Grid.Column width={6}>
      </Grid.Column>
        <Grid.Column width={16}>
        <Table>
        <Table.Body>
          {
          properties
          .map((property : any) => {
            return(
              <Table.Row key={property.id} height>
                <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell>
              </Table.Row>
            )
          })
          }
        </Table.Body>
        
      </Table>
        </Grid.Column>
      </Grid>
    );
}

export default UITemplate
