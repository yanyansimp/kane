import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Table, Segment, Loader, Transition, Input, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ReservationListItem from './ReservationListItem';

const ReservationList = () => {
   const rootStore = useContext(RootStoreContext);
   const { loadReservations, reservationRegistry, loadingInitial, IsDocsComplete } =
     rootStore.reservationStore;

   useEffect(() => {
     loadReservations();
   }, [loadReservations]);

  return (
    <Segment loading={loadingInitial}>
      {/* <Loader active={loadingInitial} inline size="tiny" floated="right" /> */}
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tran. No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Contact Number</Table.HeaderCell>
            <Table.HeaderCell>Civil Status</Table.HeaderCell>
            <Table.HeaderCell>Employment</Table.HeaderCell>
            {/* <Table.HeaderCell>Property Type</Table.HeaderCell> */}
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Terms</Table.HeaderCell>
            <Table.HeaderCell>Contract Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Documents</Table.HeaderCell>
            <Table.HeaderCell>Tran. Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            {/* <Loader active={loadingInitial} inline size="tiny" /> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reservationRegistry?.map((client) =>
            client.transactions?.map((transaction) => (
              <ReservationListItem
                key={transaction.id}
                client={client}
                transaction={transaction}
                docs={IsDocsComplete(client.documents!)}
              />
            ))
          )}
        </Table.Body>
      </Table>

      {reservationRegistry?.length === 0 && !loadingInitial ? (
        <Header as="h3" textAlign="center">
          No Results Found
        </Header>
      ) : null}
    </Segment>
  );
};

export default observer(ReservationList);
