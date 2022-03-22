import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import RoleList from './RoleList';

const RoleDashboard = () => {
    return (
      <Grid>
        <Grid.Column>
          <Fragment>
            <Segment clearing basic>
              <Header as="h2" floated="left">
                Role
              </Header>
              <Button
                icon="plus"
                content="New Role"
                floated="right"
                as={Link}
                to={'/newRole'}
              />
            </Segment>

            <RoleList />
          </Fragment>
        </Grid.Column>
      </Grid>
    );
}

export default RoleDashboard
