import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PaymentListItem from './PaymentListItem';

const PaymentList = () => {

    const rootStore = useContext(RootStoreContext);
    const {
      loadPaymentsNew,
      paymentRegistryNew,
      loadingInitial,
    } = rootStore.paymentStore;

    useEffect(() => {
      loadPaymentsNew();
    }, [loadPaymentsNew]);

  return (
    <Segment loading={loadingInitial}>
      <Table selectable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Seq. No.</Table.HeaderCell>
            <Table.HeaderCell>AR No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Contract Price</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Amount Paid</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Mode</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {paymentRegistryNew?.map((payment) =>
            <PaymentListItem 
              key={payment.id}
              payment={payment}
            />
          )}
        </Table.Body>
      </Table>

      {paymentRegistryNew?.length === 0 && !loadingInitial ? (
        <Header as="h3" textAlign="center">
          No Results Found
        </Header>
      ) : null}
    </Segment>
  );

};

export default observer(PaymentList);
