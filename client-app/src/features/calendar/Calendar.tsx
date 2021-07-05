import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Calendar = () => {
    return (
      <Grid>
        <Grid.Column width={16}>
          <FullCalendar 
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            events={[
              { title: 'Juan Dela Cruz', date: '2021-04-01' },
              { title: 'Kim Jung eun', date: '2021-04-02' }
            ]}/>
        </Grid.Column>
      </Grid>
    );
}

export default Calendar
