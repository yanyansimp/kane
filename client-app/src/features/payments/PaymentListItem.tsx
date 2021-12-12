import { format } from 'date-fns';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Table, Label, Button, Popup } from 'semantic-ui-react';
import { setStatusColor, toMoney } from '../../app/common/util/util';
import { IClient } from '../../app/models/client';
import { IPayment } from '../../app/models/payment';
import { ITransaction } from '../../app/models/transaction';

const PaymentListItem: React.FC<{ 
  client: IClient,
  payment: IPayment,
  transaction: ITransaction 
}> = ({ 
  client,
  payment,
  transaction
}) => {
  // const transaction = client.transactions[0];

  return (
    // <Fragment>
    //   {/* {transaction.payments?.map((payment) => ( */}
    //     <Table.Row>
    // <Table.Cell>
    //   <h4>
    //     {'#'}
    //     {payment.sequenceNo}
    //   </h4>
    // </Table.Cell>
    //       <Table.Cell>
    //         <h4>{payment.orNumber}</h4>
    //       </Table.Cell>
    //       <Table.Cell>
    //         <h4>
    //           {client.lastName}
    //           {', '}
    //           {client.firstName}{' '}
    //           {client.middleName && client.middleName?.charAt(0) + '. '}
    //           {client.suffix}
    //         </h4>
    //       </Table.Cell>
    //       <Table.Cell>
    //         <h4>{transaction.property?.name}</h4>
    //       </Table.Cell>
    //       <Table.Cell textAlign="center">
    //         {toMoney(transaction.contractPrice)}
    //       </Table.Cell>
    //       <Table.Cell textAlign="center">
    //         {toMoney(transaction.balance)}
    //       </Table.Cell>
    //       <Table.Cell textAlign="center">{toMoney(payment.amount)}</Table.Cell>
    //       <Table.Cell textAlign="center">
    //         {payment.typeOfPayment}
    //       </Table.Cell>
    //       <Table.Cell textAlign="center">{payment.modeOfPayment}</Table.Cell>
    //       <Table.Cell textAlign="center">
    //         {format(new Date(payment.dateOfPayment!), 'MMM dd, yyyy')}
    //       </Table.Cell>
    //       <Table.Cell>
    //         <Button circular icon="id badge outline" size="tiny" />
    //       </Table.Cell>
    //     </Table.Row>
    //   {/* ))} */}
    // </Fragment>

    <Table.Row>
      <Table.Cell>
        <h4>
          {'#'}
          {payment.sequenceNo}
        </h4>
      </Table.Cell>
      <Table.Cell>
        <h4>{payment.orNumber}</h4>
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
        <h4>{transaction.property?.name}</h4>
      </Table.Cell>
      <Table.Cell textAlign="center">
        {toMoney(transaction.contractPrice)}
      </Table.Cell>
      <Table.Cell textAlign="center">{toMoney(transaction.balance)}</Table.Cell>
      <Table.Cell textAlign="center">{toMoney(payment.amount)}</Table.Cell>
      <Table.Cell textAlign="center">{payment.typeOfPayment}</Table.Cell>
      <Table.Cell textAlign="center">{payment.modeOfPayment}</Table.Cell>
      <Table.Cell textAlign="center">
        {format(new Date(payment.dateOfPayment!), 'MMM dd, yyyy')}
      </Table.Cell>
      <Table.Cell>
        <Popup
          trigger={
            <Button
              as={Link}
              to={`/editPayment/${payment.id}`}
              circular
              icon="id badge outline"
              size="tiny"
            />
          }
          content="Edit"
          on={['hover']}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default PaymentListItem;
