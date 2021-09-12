import React, { useContext, useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';

const Calendar = () => {

  const rootStore = useContext(RootStoreContext);
  const { loadPaymentDues, getPaymentDues } = rootStore.reservationStore;

   useEffect(() => {
     loadPaymentDues();
   }, [loadPaymentDues]);

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={getPaymentDues}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
}

export default observer(Calendar);
