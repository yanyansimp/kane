import React from 'react'
import { Table, Segment } from 'semantic-ui-react';
import UserListItem from './UserListItem';

const UserList = () => {
    return (
      <Segment>
        <Table selectable basic="very" textAlign={'center'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Photo</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Mobile</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* <UserListItem /> */}
          </Table.Body>
        </Table>
      </Segment>
    );
}

export default UserList
