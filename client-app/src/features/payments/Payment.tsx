import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Input, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PaymentList from './PaymentList';

const Payment = () => {

  const rootStore = useContext(RootStoreContext);
  const {searchPayments} = rootStore.paymentStore;

  const [keyWord, setKeyWord] = useState("");

  const handleSearch = (word: string) => {
    if (word !== '') {
      setKeyWord(word);
    } else {
      searchPayments(word);
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      searchPayments(keyWord);
    }
  };
  
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

          <Input
            basic
            action={{
              icon: 'search',
              onClick: () => searchPayments(keyWord),
            }}
            placeholder="Search..."
            onChange={(e, data) => handleSearch(data.value)}
            onKeyDown={keyDownHandler}
          />

          <PaymentList />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(Payment);
