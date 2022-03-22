import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Grid, Segment, Table, Header, Label, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const RoleList = () => {

    const rootStore = useContext(RootStoreContext);
    const {
      loadRoles,
      roleRegistry,
    } = rootStore.userStore;

    useEffect(() => {
      loadRoles();
    }, [loadRoles]);
    
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Table basic="very" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={3}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={10}>Role Claims</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {roleRegistry.map((role: any) => (
                  <Table.Row key={role.key}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>{role.text}</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {role.claims.map((claim: any) => (
                        <Label color="green" horizontal>
                          {claim}
                        </Label>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <Button circular icon="pencil" />
                      <Button circular icon="trash alternate outline" />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
    );
}

export default observer(RoleList);
