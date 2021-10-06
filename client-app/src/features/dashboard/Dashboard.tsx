import React from 'react';
import { Grid, Card, Header, Icon, Table, Image} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const cardStyle = {
  padding: '15px',
  borderRadius: '20px',
  width: '260px',
};

export const Dashboard: React.FC = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <h2> Dashboard </h2>
        <Card.Group>
          <Card style={cardStyle} raised link>
            <Card.Content>
              <Card.Header>
                <Header size="large">8,391.15</Header>
              </Card.Header>
              <Card.Description>
                <Header size="small">Receivables</Header>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Icon name="arrow up" /> +10%
            </Card.Content>
          </Card>
          <Card style={cardStyle} raised link>
            <Card.Content>
              <Card.Header>
                <Header size="large">12,678.50</Header>
              </Card.Header>
              <Card.Description>
                <Header size="small">Overdue</Header>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Icon name="arrow down" /> -8%
            </Card.Content>
          </Card>
          <Card style={cardStyle} raised link>
            <Card.Content>
              <Card.Header>
                <Header size="large">12</Header>
              </Card.Header>
              <Card.Description>
                <Header size="small">Users</Header>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card style={cardStyle} raised link>
            <Card.Content>
              <Card.Header>
                <Header size="large">20</Header>
              </Card.Header>
              <Card.Description>
                <Header size="small">Sales Agents</Header>
              </Card.Description>
            </Card.Content>
          </Card>

          {/* Recent Payments */}
          {/* <Card
            style={{
              padding: '15px 15px 0 15px',
              width: '535px',
              borderRadius: '20px',
            }}
            raised
          >
            <Card.Content header="Recent Payments" />
            <Card.Content>
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/lena.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Lena B. Roger</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>22 Jul 2021</Table.Cell>
                    <Table.Cell>3,375.00</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/matthew.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Matthew J. West</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>20 Jul 2021</Table.Cell>
                    <Table.Cell>3,375.00</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/lindsay.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Lindsay Doe</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>5 Jul 2021</Table.Cell>
                    <Table.Cell>3,375.00</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/mark.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Mark Smith</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>28 Jun 2021</Table.Cell>
                    <Table.Cell>3,375.00</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
          </Card> */}
          {/* End Recent Payments */}

          {/* Recent Logged Users */}
          {/* <Card
            style={{
              padding: '15px 15px 0 15px',
              width: '535px',
              borderRadius: '20px',
            }}
            raised
          >
            <Card.Content header="Logged Users" />
            <Card.Content>
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/lena.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Lena B. Roger</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>22 Jul 2021</Table.Cell>
                    <Table.Cell>9:45AM</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="assets/images/lindsay.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content>Lindsay Doe</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>5 Jul 2021</Table.Cell>
                    <Table.Cell>8:12AM</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
          </Card> */}
          {/* End Recent Payments */}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(Dashboard);


