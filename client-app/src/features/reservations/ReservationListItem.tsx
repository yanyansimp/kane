import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Label, Button, Transition, Popup } from 'semantic-ui-react';
import { setStatusColor, toMoney } from '../../app/common/util/util';
import { IClient } from '../../app/models/client';
import { ITransaction } from '../../app/models/transaction';

const ReservationListItem: React.FC<{ client: IClient, transaction: ITransaction, docs: string }> = 
({ 
  client,
  transaction,
  docs 
}) => {
  // const transaction = client.transactions[0];

  return (
    <Table.Row>
      <Table.Cell>
        <h4>
          {'#'}
          {transaction.sequenceNo}
        </h4>
      </Table.Cell>
      <Table.Cell>
        <h4>
          {client.lastName}
          {', '}
          {client.firstName}{' '}
          {client.middleName && client.middleName?.charAt(0) + '. '}
          {client.suffix}
        </h4>
      </Table.Cell>
      <Table.Cell>
        <h4>{client.contactNumber}</h4>
      </Table.Cell>
      <Table.Cell>
        <h4>{client.civilStatus}</h4>
      </Table.Cell>
      <Table.Cell>
        <h4>{client.employment}</h4>
      </Table.Cell>
      {/* <Table.Cell>
        <h4>{""}</h4>
      </Table.Cell> */}
      <Table.Cell>
        <h4>{transaction.property?.name}</h4>
      </Table.Cell>
      <Table.Cell>{transaction.terms}</Table.Cell>
      <Table.Cell>{toMoney(transaction.contractPrice)}</Table.Cell>
      <Table.Cell>{toMoney(transaction.balance)}</Table.Cell>
      <Table.Cell>
        <Label color={setStatusColor(docs)} circular>
          {docs}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label color={setStatusColor(transaction.status)} circular>
          {transaction.status}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Popup
          trigger={
            <Button
              as={Link}
              to={`/clients/${client.id}`}
              circular
              icon="id badge outline"
              size="tiny"
            />
          }
          content="View"
          on={['hover']}
        />
        {/* <Button
          as={Link}
          to={`/clients/${client.id}`}
          circular
          icon="id badge outline"
          size="tiny"
        /> */}
        {/* <Button circular icon="pencil" size="tiny" /> */}
        {/* <Button circular icon="trash alternate outline" size="tiny" /> */}
      </Table.Cell>
    </Table.Row>
  );
};

export default ReservationListItem;
