import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Calendar = () => {
    return (
      <Grid>
        <Grid.Column width={16} style={{width: '500px'}}>
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </Grid.Column>
      </Grid>
    );
}

export default Calendar
