import React from 'react'
import { Grid, Image, Input, Button, Tab, Table } from 'semantic-ui-react'
import EditForm from './EditpropertyForm'


const Viewpropertyform = () => {
   
    return (
        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>PROPERTY</Table.HeaderCell>
        <Table.HeaderCell>LOCATION</Table.HeaderCell>
        <Table.HeaderCell>CONTRACT PRICE</Table.HeaderCell>
        <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Lot Area</Table.Cell>
        <Table.Cell>Butuan City</Table.Cell>
        <Table.Cell>1,000,000</Table.Cell>
        <Table.Cell><EditForm/></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Fillinvest</Table.Cell>
        <Table.Cell>Butuan City</Table.Cell>
        <Table.Cell>1,000,000</Table.Cell>
        <Table.Cell><Button>EDIT</Button><Button>DELETE</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Camella</Table.Cell>
        <Table.Cell>Butuan City</Table.Cell>
        <Table.Cell>1,000,000</Table.Cell>
        <Table.Cell><Button>EDIT</Button><Button>DELETE</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Lumina</Table.Cell>
        <Table.Cell>Butuan City</Table.Cell>
        <Table.Cell>1,000,000</Table.Cell>
        <Table.Cell><Button>EDIT</Button><Button>DELETE</Button></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    )
}

export default Viewpropertyform
