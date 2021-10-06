import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import PaymentList from './PaymentList';

const Payment = () => {
  return (
    <Grid>
      <Grid.Column>
        <Fragment>
          <Segment clearing basic>
            <Header as="h2" floated="left">
              Payment
            </Header>
            <Button icon="arrow up" content="Import Excel" floated="right" />
            <Button
              icon="plus"
              content="New Payment"
              floated="right"
              as={Link}
              to={'/newPayment'}
              // onClick={() => setNewReservationView(true)}
            />
          </Segment>

        <PaymentList />
        
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default Payment;
