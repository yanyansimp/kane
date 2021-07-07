import React from 'react'
import { Grid } from 'semantic-ui-react'
import UserList from './UserList'

const UserDashboard = () => {
    return (
        <Grid>
          <Grid.Column>
              <h2>Users</h2>
             <UserList />
          </Grid.Column>
        </Grid>
    )
}

export default UserDashboard
