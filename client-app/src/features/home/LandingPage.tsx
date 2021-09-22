import React, { useState } from 'react'
import { combineValidators } from 'revalidate';
import HeaderClass from './landingPageOwnerView/Header';
import BodyClass from './landingPageOwnerView/Body';
import UITemplate from './LandingView/UITemplate';
import LandingPageOverView from './landingPageOwnerView/LandingPageOverView'
import {
    Container,
    Segment,
    Header,
    Button,
    Grid,
    Form,
  } from 'semantic-ui-react';
import FooterClass from './landingPageOwnerView/Footer';
import HomePageSample from './HomePageSample';
  const validate = combineValidators({})
  
  const container = {
    backgroundColor: 'transparent',
    border: 'transparent',
    display: 'grid',
    width: '40%',
    position: 'relative',
    zIndex: 5
  };

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const handleFinalFormSubmit = (values: any) => {
    const { ...homepage } = values;
    let newPayment = {
    }
  };
    return (
      <Grid>
        <Grid.Column width={9}>
        <h2>Home Page Activities</h2>
        <HeaderClass/>
        <BodyClass/>
        <FooterClass/>
        </Grid.Column>
        <Grid.Column  style={container}>
        <Segment>
        <h2>Landing Page Over View</h2>
        <LandingPageOverView />
        </Segment>
      </Grid.Column>
      </Grid>
    )
}

export default LandingPage
