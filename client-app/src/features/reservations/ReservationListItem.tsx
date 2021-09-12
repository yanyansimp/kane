import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Label, Button } from 'semantic-ui-react';
import { setStatusColor, toMoney } from '../../app/common/util/util';
import { IClient } from '../../app/models/client';

const ReservationListItem: React.FC<{ client: IClient }> = ({ client }) => {
  const transaction = client.transactions[0];

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
          {client.firstName} {client.middleName.charAt(0)}
          {'.  '}
          {client.suffix}
        </h4>
      </Table.Cell>
      <Table.Cell>
        <h4>{transaction.property?.name}</h4>
      </Table.Cell>
      <Table.Cell textAlign="center">{transaction.terms}</Table.Cell>
      <Table.Cell textAlign="center">
        {toMoney(transaction.contractPrice)}
      </Table.Cell>
      <Table.Cell textAlign="center">{toMoney(transaction.balance)}</Table.Cell>
      <Table.Cell>
        <Label color={setStatusColor(transaction.status)} rounded="true">
          {transaction.status}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Button
          as={Link}
          to={`/clients/${client.id}`}
          circular
          icon="id badge outline"
        />
        <Button circular icon="pencil" />
        <Button circular icon="trash alternate outline" />
      </Table.Cell>
    </Table.Row>
  );
};

export default ReservationListItem;
