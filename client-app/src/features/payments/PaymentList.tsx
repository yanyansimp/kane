import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PaymentListItem from './PaymentListItem';

const PaymentList = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadReservations, reservationRegistry } = rootStore.reservationStore;

    useEffect(() => {
      loadReservations();
    }, [loadReservations]);

  return (
    <Segment>
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Seq. No.</Table.HeaderCell>
            <Table.HeaderCell>OR No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Contact Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Amount Paid</Table.HeaderCell>
            <Table.HeaderCell>Mode of Payment</Table.HeaderCell>
            <Table.HeaderCell>Date of Payment</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reservationRegistry?.map((client) => (
            <PaymentListItem key={client.id} client={client} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );

};

export default observer(PaymentList);
