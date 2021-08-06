import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Grid, Image, Input, Button, Tab, Table, Dropdown } from 'semantic-ui-react'


const ConditionalForm = () => {
    return (
        <Table celled >
        <Table.Header width={12}>
          <Table.Row>
            <Table.HeaderCell>IMAGE</Table.HeaderCell>
            <Table.HeaderCell>PROPERTY</Table.HeaderCell>
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {/* {properties.map((property : any) => { */}
            {/* return (  */}
            <Table.Row >
              <Table.Cell>
                
                {/* <Image size="tiny" src={property.image.url} /> */}
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>
                {/* <EditForm /> */}
              </Table.Cell>
            </Table.Row>
          {/* )})} */}
        </Table.Body>
      </Table>
    );
}

export default observer(ConditionalForm);
function num(num: any) {
  throw new Error('Function not implemented.')
}

