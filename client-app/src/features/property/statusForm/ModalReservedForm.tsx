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
  const ModalReservedModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext)
    const {returnStatus} = rootStore.propertyStore
    const [proper, setProperties] = useState([])
    const propFunc = (prop: any) => {
      setProperties(prop)
    }
    useEffect(() => {
        setChildProperty(name)
        returnStatus(propFunc)
        },[name, returnStatus])
        var i=0,j=0;
        var propertyTypeId:any = [];
        var n = [[''], ['']];
        var d = [[''], ['']];
        var l = [[''], ['']];
        var s = [[''], ['']];
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
                RESERVED
              </Button>
              <Label as='a' basic color='red' pointing='left'>
                {name[4]}
              </Label>
            </Button>
                  }
        >
         
          <Modal.Header>RESERVED</Modal.Header>
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
            {proper
              .map((propertyType: any) =>{ 
                if(propertyType.id === name[6]){
                  propertyTypeId = propertyType
                  propertyTypeId.properties?.map((property: any)=>{
                    if(property.status === 'Reserved'){
                      n[i][j] = property.name;
                      d[i][j] = property.description.substring(0,10)+'...';
                      l[i][j] = property.location;
                      s[i][j] = property.status;
                      j++
                    }})}})}
              {propertyTypeId.properties?.map((property:any, index:any) => {
                 return(
                  <Table.Row key={index}>
                    {/* <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell> */}
                    <Table.Cell>{n[i][index]}</Table.Cell>
                    <Table.Cell>{d[i][index]}</Table.Cell>
                    <Table.Cell>{l[i][index]}</Table.Cell>
                    <Table.Cell>{s[i][index]}</Table.Cell>
                  </Table.Row> 
                )})}
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

export default ModalReservedModal


