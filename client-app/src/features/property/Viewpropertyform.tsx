import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Grid, Image, Input, Button, Tab, Table, Dropdown } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import {makeStyles} from '@material-ui/core'
import ModalEdit from './condition/ModalEditForm'
import ModalDelete from './condition/ModalDeleteForm'
import { useHistory } from "react-router-dom";


const Viewpropertyform:React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProperties, getProperties} = rootStore.propertyStore;
  const [properties, setProperties] = useState([])
  const propFunc = (prop: any) => {
    setProperties(prop)
  }
  const [property, setParentName] = useState<string>('');
  const updateName = (name: string):void => {
    setParentName(name)
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
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {properties.map((property : any) => {
            return ( 
            <Table.Row key={property.id} height={2}>
                  <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell>
                  <Table.Cell>{property.description}</Table.Cell>
                  <Table.Cell>{property.location}</Table.Cell>
                  <Table.Cell>{property.status}</Table.Cell>
                  <Table.Cell><ModalEdit name={property}/>
                              <ModalDelete name={property} />
                  </Table.Cell>
            </Table.Row>
          )})}
        </Table.Body>
      </Table>
    );
}

export default observer(Viewpropertyform);

