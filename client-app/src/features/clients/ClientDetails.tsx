import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';
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
    <Grid>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Header>
              <Header as="h1">{`${client?.lastName}, ${client?.firstName} `}</Header>
            </Item.Header>
          </Item>
        </Item.Group>
      </Segment>
    </Grid>
  );
};

export default ClientDetails;
