import { makeStyles } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Segment, Header, Image, Icon, Modal, Dropdown, Table, Label } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
const useStyles = makeStyles({
  btn: {
    top: '1px',
    right: '-50px',
    width: '50%',
    height: '3rem',
    backgroundColor: orange[500],
    color: '#fff',
    '&:hover':{
        color:'red'
    }
  },
})

  interface IfirstChildProps {
    name: any,
  }
  const ModalOccupiedModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext);
    const {DeleteProperty, loading} = rootStore.propertyStore;
    useEffect(() => {
        setChildProperty(name)
        },[name])
  console.log(name)
  return (
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
            {name}
          </Label>
        </Button>
          // <Button 
          //     color='orange'
          //     content='AVAILABLE'
          //     icon='heart'
          //     label={{ as: 'a', basic: true, content: '2,048' }}
          //     labelPosition='right'
          //     />
        
              }
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
            <Table.Row >
                  {/* <Table.Cell><Image size="tiny" src={name.image.url} /></Table.Cell> */}
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell> </Table.Cell>
                  <Table.Cell></Table.Cell>
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

export default ModalOccupiedModal


