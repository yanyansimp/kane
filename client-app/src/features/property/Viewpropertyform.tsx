import { copyFile } from 'fs'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Grid, Image, Input, Button, Tab, Table, Dropdown } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import EditForm from './EditpropertyForm'


const Viewpropertyform = () => {
  
  const rootStore = useContext(RootStoreContext);
  const {loadProperties, getProperties} = rootStore.propertyStore;
  const [properties, setProperties] = useState([])
  const propFunc = (prop: any) => {
    setProperties(prop)
  }

  useEffect(() => {
    loadProperties()
    getProperties(propFunc)
  }, [loadProperties, getProperties]);
  

    return (
      <Table celled >
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
          {properties.map((property : any) => {
            return (
            <Table.Row key={property.id}>
              <Table.Cell>
                
                <Image size="tiny" src={property.image.url} />
                  </Table.Cell>
                  <Table.Cell>{property.name}</Table.Cell>
                  <Table.Cell>{property.name}</Table.Cell>
                  <Table.Cell>{property.name}</Table.Cell>
                  <Table.Cell>
                <EditForm />
              </Table.Cell>
            </Table.Row>
          )})}
        </Table.Body>
      </Table>
    );
}

export default observer(Viewpropertyform);
function num(num: any) {
  throw new Error('Function not implemented.')
}

