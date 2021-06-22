import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavBar } from '../nav/NavBar';
import { SideBar } from '../sidebar/SideBar';

export const Dashboard: React.FC = () => {
  return (
    <Fragment>
     
    </Fragment>

    // <Grid celled>
    //   <Grid.Row stretched>
    //     <Grid.Column width={3}>
    //       <h1>1</h1>
    //     </Grid.Column>
    //     <Grid.Column width={10}>
    //         <NavBar />
    //       {/* <h1>2</h1> */}
    //     </Grid.Column>
    //     {/* <Grid.Column width={3}>
    //       <h1>3</h1>
    //     </Grid.Column> */}
    //   </Grid.Row>

    //   <Grid.Row>
    //     <Grid.Column width={3}>
    //       <h1>4</h1>
    //     </Grid.Column>
    //     <Grid.Column width={10}>
    //       <h1>5</h1>
    //     </Grid.Column>
    //     <Grid.Column width={3}>
    //       <h1>6</h1>
    //     </Grid.Column>
    //   </Grid.Row>
    // </Grid>
  );
};

export default observer(Dashboard);


