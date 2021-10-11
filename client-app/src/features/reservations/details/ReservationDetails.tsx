import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Item,
  List,
  Segment,
  Image,
  Label,
  Table,
  Input,
} from 'semantic-ui-react';
import { toMoney } from '../../../app/common/util/util';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  clientId: string;
  transactionId: string;
}

export const ReservationDetails: React.FC<RouteComponentProps<DetailParams>> =
  ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { loadReservation, transaction } = rootStore.reservationStore;

    useEffect(() => {
      loadReservation(match.params.clientId, match.params.transactionId);
    }, [
      loadReservation,
      match.params.clientId,
      match.params.transactionId,
      history,
    ]);

    return (
      <Grid stackable>
        <Grid.Column width="10">
          <Segment basic>
            <Header as="h2">Account Statement</Header>
          </Segment>
          <Segment clearing padded="very">
            <Item.Group>
              <Item>
                <Item.Content fluid>
                  <Button.Group floated="right" size="mini">
                    <Dropdown
                      className="ui circular icon button"
                      pointing="top left"
                      icon="ellipsis vertical"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          //   as={Link}
                          //   to={`/editClient/${client?.id}`}
                          text="Edit"
                          icon="edit outline"
                          disabled
                        />
                        <Dropdown.Item text="Delete" icon="times" disabled/>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Button.Group>
                  <Item.Header>
                    <Header as="h2">{transaction?.propertyTypeName}</Header>
                    <Header as="h1">
                      {`#${transaction?.sequenceNo} - ${transaction?.property?.name}`}
                    </Header>
                  </Item.Header>

                  <Divider clearing />

                  <Item.Description>
                    <Header as="h3">{transaction?.clientName}</Header>
                  </Item.Description>
                  <Item.Description>
                    <Header as="h4">
                      {/* {client?.civilStatus} */}
                      Date of Transaction:{' '}
                      {transaction?.createdAt &&
                        transaction?.createdAt?.toDateString()}
                      {/* {() => console.log(transaction?.createdAt)} */}
                      {/* {format(
                        new Date(transaction?.createdAt!),
                        'MMMM dd, yyyy'
                      )} */}
                      {/* {
                        transaction?.createdAt?.toDateString()
                      } */}
                    </Header>
                  </Item.Description>
                  <Item.Description>
                    <Header as="h4">Terms: {transaction?.terms}</Header>
                  </Item.Description>
                  <Item.Description>
                    <Header as="h4">
                      Contract Price: {toMoney(transaction?.contractPrice)}
                    </Header>
                  </Item.Description>
                  <Item.Description>
                    <Header as="h4">
                      Balance: {toMoney(transaction?.balance)}
                    </Header>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width="6">
          <Segment clearing basic>
            <Button floated="right" size="small" icon="print" content="Print" />
          </Segment>
          <Segment basic>
            <Header as="h5">
              Status:
              <Label color="blue" size="medium" circular>
                {transaction?.status}
              </Label>
              {/* <Label color="red" size="medium" circular>
                Overdue: 3 months
              </Label> */}
            </Header>
            <List>
              <List.Item>
                <Image avatar src={transaction?.salesManager?.image || "/assets/user.png"} />
                <List.Content>
                  <List.Header>{transaction?.salesManager?.name || "None"}</List.Header>
                  Sales Manager
                </List.Content>
              </List.Item>
            </List>
            <List horizontal>
              <List.Item>
                <Image avatar src={transaction?.salesAgent?.image || "/assets/user.png"} />
                <List.Content>
                  <List.Header>{transaction?.salesAgent?.name || "None"}</List.Header>
                  Sales Agent
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width="10">
          <Segment padded>
            <Header as="h2">Payments</Header>
            {/* <Input action={{ icon: 'search' }} placeholder="Search..." /> */}

            <Table selectable basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Seq. No.</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Mode of Payment</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {transaction?.payments?.map((payment) => (
                  <Table.Row key={payment.id}>
                    <Table.Cell>#{payment.sequenceNo}</Table.Cell>
                    <Table.Cell>{toMoney(payment.amount)}</Table.Cell>
                    <Table.Cell>{payment.modeOfPayment}</Table.Cell>
                    <Table.Cell>
                      {format(new Date(payment.dateOfPayment!), 'MMM dd, yyyy')}
                    </Table.Cell>
                    <Table.Cell>
                      <Button circular icon="id badge outline" size="tiny" />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  };

export default observer(ReservationDetails);
