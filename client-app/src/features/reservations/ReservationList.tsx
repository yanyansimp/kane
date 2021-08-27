import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import ReservationListItem from './ReservationListItem';

const ReservationList = () => {
  return (
    <Segment>
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sequence No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Contact Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <ReservationListItem />
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default ReservationList;
