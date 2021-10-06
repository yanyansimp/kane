import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import UserList from './UserList'

const UserDashboard = () => {
    return (
      <Grid>
        <Grid.Column>
          <Fragment>
            <Segment clearing basic>
              <Header as="h2" floated="left">
                User
              </Header>
              <Button
                icon="plus"
                content="New Role"
                floated="right"
                as={Link}
                to={'/newRole'}
              />
              <Button
                icon="plus"
                content="New User"
                floated="right"
                as={Link}
                to={'/newUser'}
              />
            </Segment>

            <UserList />
          </Fragment>
        </Grid.Column>
      </Grid>
    );
}

export default UserDashboard
