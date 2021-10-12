import React, { useContext, useEffect, useState } from 'react'
import { Button, Segment, Header, Image, Icon, Modal, Dropdown, Table, Label, Input, Grid, Divider } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import ModalEdit from '../condition/ModalEditForm'
import ModalDelete from '../condition/ModalDeleteForm'
import ModalView from '../condition/ModalViewForm'

const searchBar = {
  top : '1px',
  left: '550px',
  width: '30%',
};

  interface IfirstChildProps {
    name: any,
  }
  const ModalAvailableModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const [visible, setVisible] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext)
    const {returnStatus} = rootStore.propertyStore
    const [proper, setProperties] = useState([])
    const propFunc = (prop: any) => {
      setProperties(prop)
    }
    const showMoreItems = () => {
      setVisible((prevValue) => prevValue + 5);
    };
    useEffect(() => {
        setChildProperty(name)
        returnStatus(propFunc)
        },[name, returnStatus])
        var i=0;
        var propertyTypeId:any = [];
        var n = [[''], ['']];
        var d = [[''], ['']];
        var l = [[''], ['']];
        var s = [[''], ['']];
  return (
    <Grid>
      <Grid.Column width={16}>
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button as='div' labelPosition='right'>
                <Button color='yellow'>
                  <Icon name='heart' />
                  AVAILABLE
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {name[3]}
                </Label>
              </Button>
                    }
          >
          
            <Modal.Header>AVAILABLE</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Header>{name[1].substring(0,10)+'...'}</Header>
                {/* <Input
                    style={searchBar}
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>{
                        setSearchTerm(e.target.value);
                    }}
                    placeholder="search"
                    icon='search'
                  /> */}
                <Table celled >
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell>IMAGE</Table.HeaderCell> */}
                  <Table.HeaderCell>PROPERTY</Table.HeaderCell>
                  <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
                  <Table.HeaderCell>LOCATION</Table.HeaderCell>
                  <Table.HeaderCell>STATUS</Table.HeaderCell>
                  <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
              {proper
              .map((propertyType: any) =>{ 
                if(propertyType.id === name[6]){
                  propertyTypeId = propertyType
                  propertyTypeId.properties?.map((property: any, index:any)=>{
                    if(property.status === 'Available'){
                      
                      n[i][index] = property.name;
                      d[i][index] = property.description.substring(0,10)+'...';
                      l[i][index] = property.location;
                      s[i][index] = property.status;
                    }
                    })}})}
              {propertyTypeId.properties
              ?.slice(0,visible)
              .map((property:any, index:any) => {
                if(property.status === "Available"){
                  return(
                    <Table.Row key={index}>
                      {/* <Table.Cell><Image size="tiny" src={property.image.url} /></Table.Cell> */}
                      <Table.Cell>{n[i][index]}</Table.Cell>
                      <Table.Cell>{d[i][index]}</Table.Cell>
                      <Table.Cell>{l[i][index]}</Table.Cell>
                      <Table.Cell>{s[i][index]}</Table.Cell>
                      <Table.Cell><ModalView name={property} /><ModalEdit name={property}/> <ModalDelete name={property} /> </Table.Cell>
                    </Table.Row> 
                  )
                }
              })}
              <Divider hidden/>
                <Segment basic textAlign={"center"}>
                    <Button  primary onClick={showMoreItems}  style={{textAlign: "center"}}>Load More...</Button>
                </Segment>
              <Divider hidden/>
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

export default ModalAvailableModal



