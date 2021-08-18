import { makeStyles } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Segment, Header, Image, Icon, Modal, Dropdown, Table, Label, Grid, Input } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const searchBar = {
  top : '20px',
  left: '550px',
  width: '30%',
};

interface IfirstChildProps {
    name: any,
  }
  const ModalOccupiedModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext);
    const {returnOccupied} = rootStore.propertyStore
    const [properties, setProperties] = useState([])
    const propFunc = (prop: any) => {
      setProperties(prop)
    }
    useEffect(() => {
        setChildProperty(name)
        returnOccupied(propFunc)
        },[name, returnOccupied])
  return (
    <Grid>
      <Grid.Column with={16}>
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button as='div' labelPosition='right'>
                <Button color='yellow'>
                  <Icon name='heart' />
                  OCCUPIED 
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {name[5]}
                </Label>
              </Button>
                    }
          >
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
            <Modal.Header>OCCUPIED</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Header>{name[1]}</Header>
                <Table celled >
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell>IMAGE</Table.HeaderCell> */}
                  <Table.HeaderCell>PROPERTY</Table.HeaderCell>
                  <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
                  <Table.HeaderCell>LOCATION</Table.HeaderCell>
                  <Table.HeaderCell>STATUS</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {properties
                .filter((property : any) => property.name.toLowerCase().includes(searchTerm.toLowerCase()) || property.description.toLowerCase().includes(searchTerm.toLowerCase()) || property.location.toLowerCase().includes(searchTerm.toLowerCase()) || property.status.toLowerCase().includes(searchTerm.toLowerCase()) )
                .map((property: any) =>{
                  if(property.propertyTypeId === name[6]){
                    return (
                      <Table.Row key={property.id}>
                        {/* <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell> */}
                        <Table.Cell>{property.name}</Table.Cell>
                        <Table.Cell>{property.description}</Table.Cell>
                        <Table.Cell>{property.location}</Table.Cell>
                        <Table.Cell>{property.status}</Table.Cell>
                      </Table.Row> 
                    )
                  }
                })}
              </Table.Body>
            </Table>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>
              <Icon name='remove' /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
      </Grid.Column>
    </Grid>
    
  )
}

export default ModalOccupiedModal


