import React from 'react';
import { Grid } from 'semantic-ui-react';
import ReservationList from './ReservationList';

const Reservation = () => {
    return (
      <Grid>
        <Grid.Column>
          <h2>Reservations</h2>
          
          <ReservationList />
        </Grid.Column>
      </Grid>
    );
}

export default Reservation
