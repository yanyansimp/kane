import React, { useContext, useEffect, useState } from 'react'
import { Button, Header, Image, Icon, Modal, Dropdown, Table } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import {history} from '../../..'
import { useHistory } from 'react-router-dom'

  interface IfirstChildProps {
    name: any,
  }

  const ModalDeleteModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext);
    const {DeleteProperty, loading} = rootStore.propertyStore;
    
    useEffect(() => {
        setChildProperty(name)
        },[name])

    let history = useHistory();
    function handleClick(e: any) {
    DeleteProperty(name.id);
    window.location.reload();
    // e.target.reset();
    // this.props.history.push('/property');
    // history.push("/property");
  } 
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular icon="trash alternate outline" />}
    >
      <Modal.Header>Make a Title</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Header</Header>
          <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IMAGE</Table.HeaderCell>
            <Table.HeaderCell>PROPERTY</Table.HeaderCell>
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {/* {properties.map((property : any) => { */}
            {/* return (  */}
            <Table.Row key={name.id}>
                  <Table.Cell><Image size="tiny" src={name.image.url} /></Table.Cell>
                  <Table.Cell>{name.description.substring(0, 10)+ '...'}</Table.Cell>
                  <Table.Cell>{name.location}</Table.Cell>
                  <Table.Cell> {name.status} </Table.Cell>
                  <Table.Cell><Button onClick={handleClick} >Delete</Button></Table.Cell>
            </Table.Row>
          {/* ) */}
          {/* })} */}
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
  )
}

export default ModalDeleteModal


