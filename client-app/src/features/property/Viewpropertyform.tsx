import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import EditForm from './EditpropertyForm'


const Viewpropertyform = () => {
  const rootStore = useContext(RootStoreContext);
  const {propertTypesByName, loadPropertyTypes} = rootStore.propertyTypeStore;
  
  useEffect(() => {
    loadPropertyTypes()
  }, [loadPropertyTypes]);
   
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IMAGE</Table.HeaderCell>
            <Table.HeaderCell>PROPERTY</Table.HeaderCell>
            <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {propertTypesByName.map((propertyType) => (
            <Table.Row key={propertyType.id}>
              <Table.Cell>
                <Image size="tiny" src={propertyType.image.url} />
              </Table.Cell>
              <Table.Cell>{propertyType.name}</Table.Cell>
              <Table.Cell>{propertyType.description}</Table.Cell>
              <Table.Cell>{propertyType.location}</Table.Cell>
              <Table.Cell>
                <EditForm />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
}

export default observer(Viewpropertyform);
