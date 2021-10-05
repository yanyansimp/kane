import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Table, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import UserListItem from './UserListItem';

const UserList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUsers, userRegistry } = rootStore.userStore;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

    return (
      <Segment>
        <Table selectable basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Photo</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Mobile</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {userRegistry?.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </Table.Body>
        </Table>
      </Segment>
    );
}

export default observer(UserList);
