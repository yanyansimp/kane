import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch, Link, useLocation, useParams} from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import { SideBar } from '../../features/sidebar/SideBar';
import { Dashboard } from '../../features/dashboard/Dashboard';
import PropertyForm from '../../features/property/PropertyForm';
import PaymentForm from '../../features/payments/PaymentForm';
import Calendar from '../../features/calendar/Calendar';
import UserDashboard from '../../features/user/dashboard/UserDashboard';
import RegistrationForm from '../../features/user/RegistrationForm';
import AddRoleForm from '../../features/role/AddRoleForm';
import ReservationForm from '../../features/reservations/forms/ReservationForm';
import Reservation from '../../features/reservations/Reservation';
import Payment from '../../features/payments/Payment';
import ClientDetails from '../../features/clients/ClientDetails';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../../features/home/LandingPage';
import HomePageSample from '../../features/home/HomePageSample';
// import Home from '../../features/homepage/Home'
import LandingPageOfPropertyType from '../../features/home/LandingPageOfPropertyType';
import EditClientForm from '../../features/clients/forms/EditClientForm';
import ReservationDetails from '../../features/reservations/details/ReservationDetails';
import Viewpropertyform from '../../features/property/Viewpropertyform';
import AddPropertyForm from '../../features/reservations/forms/AddPropertyForm';


const App: React.FC<RouteComponentProps> = ({ location }) => {
  var id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content='Loading app..' />
  let noNavAndSideBar = true;

  return (
    <Fragment>
      <ModalContainer />
      {/* <Route exact path="/" component={HomePage} /> */}
      <Route exact path="/" component={HomePageSample} />
      {/* <Route exact path="/" component={Home} /> */}

      
      <ToastContainer position="bottom-right" />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
          {location.pathname !== `/properties/${id}` && <NavBar /> }
          {location.pathname !== `/properties/${id}` && <SideBar />}
          {location.pathname === `/properties/${id}` && (noNavAndSideBar = false) }
            {/* <NavBar /> */}
            {/* <SideBar /> */}
            <Container   className={noNavAndSideBar ?'main-container': ' '}>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/calendar" component={Calendar} />
                <PrivateRoute exact path="/property" component={PropertyForm} />
                <PrivateRoute exact path="/reservation" component={Reservation} />
                <PrivateRoute exact path="/user" component={UserDashboard} />
                <PrivateRoute exact path="/payment" component={Payment} />
                <PrivateRoute exact path="/activities" component={ActivityDashboard} />

                <PrivateRoute path="/activities/:id" component={ActivityDetails} />
                <PrivateRoute path="/clients/:id" component={ClientDetails} />
                
                <PrivateRoute
                  key={location.key}
                  path="/client/:clientId/transaction/:transactionId" 
                  component={ReservationDetails} 
                />

                <PrivateRoute
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />

                <PrivateRoute
                  key={location.key}
                  path={['/newReservation']}
                  component={ReservationForm}
                />

                <PrivateRoute
                  key={location.key}
                  path={['/addReservation/:clientId', '/editReservation/:clientId/transaction/:transactionId']}
                  component={AddPropertyForm}
                />

                <PrivateRoute 
                  key={location.key}
                  path={['/editClient/:id']}
                  component={EditClientForm}
                />

                {/* <PrivateRoute
                  key={location.key}
                  path={['/newReservation', '/editReservation/:id']}
                  component={ReservationForm}
                /> */}

                <PrivateRoute
                  key={location.key}
                  path={['/newPayment', '/editPayment/:id']}
                  component={PaymentForm}
                />

                <PrivateRoute
                  key={location.key}
                  path={['/newUser', '/editUser/:id']}
                  component={RegistrationForm}
                />

                <PrivateRoute
                  key={location.key}
                  path={['/newRole', '/editRole/:id']}
                  component={AddRoleForm}
                />

                <PrivateRoute
                  key={location.key}
                  path={['/createReservation', '/editReservation/:id']}
                  component={ReservationForm}
                />

                <Route exact path="/landingPage" component={LandingPage} />

                <Route exact path="/propertyType/:id" component={Viewpropertyform} />
                
                <Route 
                key={location.key} 
                path={['/properties/:id']} 
                component={LandingPageOfPropertyType} 
                />
                
                {/* <Route path="/profile/:username" component={ProfilePage} /> */}
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
      
    </Fragment>
  );
};

export default withRouter(observer(App));
