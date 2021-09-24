import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Table, Segment, Loader, Transition } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ReservationListItem from './ReservationListItem';

const ReservationList = () => {
   const rootStore = useContext(RootStoreContext);
   const { loadReservations, reservationRegistry, loadingInitial } =
     rootStore.reservationStore;

   useEffect(() => {
     loadReservations();
   }, [loadReservations]);

  return (
    <Segment>
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tran. No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Civil Status</Table.HeaderCell>
            <Table.HeaderCell>Employment</Table.HeaderCell>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Terms</Table.HeaderCell>
            <Table.HeaderCell>Contact Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Documents</Table.HeaderCell>
            <Table.HeaderCell>Tran. Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Loader active={loadingInitial} inline size="tiny" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Transition.Group duration={200}>
            {reservationRegistry?.map((client) => (
              <ReservationListItem key={client.id} client={client} />
            ))}
          </Transition.Group>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default observer(ReservationList);
