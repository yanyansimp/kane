import React from 'react';
import { Header, Table, Image, Label, Button } from 'semantic-ui-react';

const ReservationListItem: React.FC = () => {
  return (
    <Table.Row>
      <Table.Cell>
        <h4>#1</h4>
      </Table.Cell>
      <Table.Cell>
        <h4>Juan Dela Cruz Jr.</h4>
      </Table.Cell>
      <Table.Cell>Blk. 20 Lot 6, San Vicente</Table.Cell>
      <Table.Cell>145,000</Table.Cell>
      <Table.Cell>50,000</Table.Cell>
      <Table.Cell>
        <Label color={'green'} rounded>
          On Going
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Button circular icon="id badge outline" />
        <Button circular icon="pencil" />
        <Button circular icon="trash alternate outline" />
      </Table.Cell>
    </Table.Row>
  );
};

export default ReservationListItem;
