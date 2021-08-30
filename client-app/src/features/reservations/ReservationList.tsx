import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { IClient } from '../../app/models/client';
import { RootStoreContext } from '../../app/stores/rootStore';
import ReservationListItem from './ReservationListItem';

const ReservationList = () => {
   const rootStore = useContext(RootStoreContext);
   const { loadReservations, reservationRegistry } =
     rootStore.reservationStore;

   useEffect(() => {
     loadReservations();
   }, [loadReservations]);

  return (
    <Segment>
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sequence No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Terms(Years)</Table.HeaderCell>
            <Table.HeaderCell>Contact Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reservationRegistry?.map(client => 
            <ReservationListItem key={client.id} client={client} />
          )}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default observer(ReservationList);
