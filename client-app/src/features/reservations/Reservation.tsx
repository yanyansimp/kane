import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { IClient } from '../../app/models/client';
import { RootStoreContext } from '../../app/stores/rootStore';
import ReservationForm from './forms/ReservationForm';
import ReservationList from './ReservationList';

export const Reservation: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    newReservationView,
    setNewReservationView,
  } = rootStore.reservationStore;

  useEffect(() => {
    setNewReservationView(false);
  }, [setNewReservationView]);

  return (
    <Grid>
      <Grid.Column>
        {!newReservationView && (
          <Fragment>
            <Segment clearing basic>
              <Header as="h2" floated="left">
                Reservation
              </Header>
              <Button icon="arrow up" content="Import Excel" floated="right" />
              <Button
                icon="plus"
                content="New Reservation"
                floated="right"
                as={Link}
                to={'/newReservation'}
                // onClick={() => setNewReservationView(true)}
              />
            </Segment>

            <ReservationList />
          </Fragment>
        )}
        {/* {newReservationView && <ReservationForm />} */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(Reservation);
