import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Search, Grid, Image, Input, Button, Tab, Table, Dropdown, Icon, Pagination } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import {makeStyles} from '@material-ui/core'
import ModalEdit from './condition/ModalEditForm'
import ModalDelete from './condition/ModalDeleteForm'
import ModalView from './condition/ModalViewForm'

const searchBar = {
  left: '450px',
  width: '100%'
};
const pagination = {
  justifyContent: 'center',
};
const Viewpropertyform:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      <Grid>
        <Grid.Column width={6}>
          <Input
          style={searchBar}
          type="text"
          value={searchTerm}
          onChange={(e) =>{
              setSearchTerm(e.target.value);
          }}
          placeholder="search"
          icon='search'
        />
      </Grid.Column>
        <Grid.Column width={16}>
        <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IMAGE</Table.HeaderCell>
            <Table.HeaderCell>PROPERTY</Table.HeaderCell>
            <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
          properties
          .filter((property : any) => property.name?.toLowerCase().includes(searchTerm.toLowerCase()) || property.description?.toLowerCase().includes(searchTerm.toLowerCase()) || property.location?.toLowerCase().includes(searchTerm.toLowerCase()) || property.status?.toLowerCase().includes(searchTerm.toLowerCase()) )
          .map((property : any) => {
            return(
              <Table.Row key={property.id} height={2}>
                <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell>
                <Table.Cell>{property.name}</Table.Cell>
                <Table.Cell>{property.description?.substring(0, 10)+ '...'}</Table.Cell>
                <Table.Cell>{property.location}</Table.Cell>
                <Table.Cell>{property.status}</Table.Cell>
                <Table.Cell><ModalView name={property} /><ModalEdit name={property}/> <ModalDelete name={property} /> </Table.Cell>
              </Table.Row>
            )
          })
          }
        </Table.Body>
      </Table>
        </Grid.Column>
        {/* <Grid.Column style={pagination}>
        <Pagination
              
              defaultActivePage={5}
              ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
              firstItem={{ content: <Icon name='angle double left' />, icon: true }}
              lastItem={{ content: <Icon name='angle double right' />, icon: true }}
              prevItem={{ content: <Icon name='angle left' />, icon: true }}
              nextItem={{ content: <Icon name='angle right' />, icon: true }}
              totalPages={50}
            />
        </Grid.Column> */}
      </Grid>
      
    );
}

export default observer(Viewpropertyform);

