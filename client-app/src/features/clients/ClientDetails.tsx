import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import { toMoney } from '../../app/common/util/util';
import { RootStoreContext } from '../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

export const ClientDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadClient, client } = rootStore.reservationStore;

  useEffect(() => {
    loadClient(match.params.id);
  }, [loadClient, match.params.id, history]);

  return (
    <Grid stackable>
      <Grid.Column width="10">
        <Segment basic>
          <Header as="h2">Account Summary</Header>
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
                      <Dropdown.Item text="View Full Details" icon="user" />
                      <Dropdown.Item
                        as={Link}
                        to={`/editClient/${client?.id}`}
                        text="Edit"
                        icon="edit outline"
                      />
                      <Dropdown.Item text="Delete" icon="user delete" />
                    </Dropdown.Menu>
                  </Dropdown>
                </Button.Group>
                <Item.Header>
                  <Header as="h1">
                    {client?.firstName}{' '}
                    {client?.middleName && client?.middleName?.charAt(0) + '. '}
                    {client?.lastName} {client?.suffix}
                  </Header>
                </Item.Header>

                <Divider clearing />

                <Item.Description>
                  <Header as="h3">{client?.contactNumber}</Header>
                </Item.Description>
                <Item.Description>
                  <Header as="h4">{client?.civilStatus}</Header>
                </Item.Description>
                <Item.Description>
                  <Header as="h4">{client?.employment}</Header>
                </Item.Description>
                <Item.Description>
                  <Header as="h4">{client?.address}</Header>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>

      <Grid.Column width="6">
        <Segment clearing basic>
          <Button floated="right" size="small" icon="print" content="Print" />
          <Button
            floated="right"
            size="small"
            icon="home"
            content="Add Property"
          />
        </Segment>
        <Segment basic>
          <Header as="h5">
            Documents:
            <Label color="yellow" size="medium" circular>
              Complete
            </Label>
          </Header>
          <List horizontal>
            <List.Item>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                Post Dated Cheque
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                Photocopy of Marriage Certificate/Birth Certificate
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />2 pcs 2x2
                picture
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                Community Tax Certificate
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                Proof of Billing
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />2 Valid
                ID's (Company and Government)
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                Tax Identification Number
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                House Sketch
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />3 pcs 1x1
                picture
              </List.Content>
              <List.Content>
                <Icon name="check circle" size="small" color="green" />
                SPA (with Consular Seal if notarized abroad)
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Grid.Column>

      <Grid.Column width="10">
        {client?.transactions.map((transaction) => (
          <Segment padded key={transaction.id}>
            <Grid>
              <Grid.Row>
                <Grid.Column width="2" style={{ padding: '10px' }}>
                  <Header as="h4">
                    {'#'}
                    {transaction.sequenceNo}
                  </Header>
                </Grid.Column>
                <Grid.Column width="4" style={{ padding: '10px' }}>
                  <Header as="h4">{transaction.property?.name}</Header>
                </Grid.Column>
                <Grid.Column width="2">
                  <Header as="h4">{transaction.status}</Header>
                </Grid.Column>
                <Grid.Column width="4" style={{ padding: '10px' }}>
                  <Header as="h4" floated="right">
                    {toMoney(transaction.contractPrice)}
                  </Header>
                </Grid.Column>
                <Grid.Column width="4">
                  <Button 
                    floated="right" 
                    size="tiny" 
                    as={Link} 
                    to={`/client/${client.id}/transaction/${transaction.id}`}
                  >
                    View
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ClientDetails);
