import { AnyARecord } from 'dns';
import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Input, Segment } from 'semantic-ui-react';
import { IClient } from '../../app/models/client';
import { RootStoreContext } from '../../app/stores/rootStore';
import ReservationForm from './forms/ReservationForm';
import ReservationList from './ReservationList';

export const Reservation: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    newReservationView,
    setNewReservationView,
    searchReservations
  } = rootStore.reservationStore;

  useEffect(() => {
    setNewReservationView(false);
  }, [setNewReservationView]);

  const [keyWord, setKeyWord] = useState("");

  const handleSearch = (word: string) => {
    if (word !== "") {
      setKeyWord(word);
    } else {
      searchReservations(word);
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      searchReservations(keyWord);
    }
  };

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

            <Input
              basic
              action={{
                icon: 'search',
                onClick: () => searchReservations(keyWord),
              }}
              placeholder="Search..."
              onChange={(e, data) => handleSearch(data.value)}
              onKeyDown={keyDownHandler}
            />

            <ReservationList />
          </Fragment>
        )}
        {/* {newReservationView && <ReservationForm />} */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(Reservation);
