import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Calendar = () => {
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={[
                {
                  title: '#121 Juan Dela Cruz-Payment Due',
                  date: '2021-08-08',
                },
                {
                  title: '#167 Kim Jung Eun-Payment Due',
                  date: '2021-08-08',
                },
                {
                  title: '#101 Rodrigo Duterte-Payment Due',
                  date: '2021-08-06',
                },
              ]}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
}

export default Calendar
