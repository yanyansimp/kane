import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch} from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import ClientForm from '../../features/forms22/ClientForm';
import ClientForm2 from '../../features/forms22/ClientForm2';
import ClientForm3 from '../../features/forms22/ClientForm3';
import ClientForm4 from '../../features/forms22/ClientForm4';
import ClientForm5 from '../../features/forms22/ClientForm5';
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

const App: React.FC<RouteComponentProps> = ({ location }) => {
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

  return (
    <Fragment>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <ToastContainer position="bottom-right" />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <SideBar />
            <Container className={'main-container'}>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/property" component={PropertyForm} />
                // <Route exact path="/forms" component={ClientForm} />
                <Route exact path="/forms2" component={ClientForm2} />
                <Route exact path="/forms3" component={ClientForm3} />
                <Route exact path="/forms4" component={ClientForm4} />
                <Route exact path="/forms5" component={ClientForm5} />
                <Route exact path="/user" component={UserDashboard} />
                <Route exact path="/payments" component={PaymentForm} />
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route
                  key={location.key}
                  path={['/registerUser', '/editUser/:id']}
                  component={RegistrationForm}
                />
                <Route
                  key={location.key}
                  path={['/createRole', '/editRole/:id']}
                  component={AddRoleForm}
                />
                <Route
                  key={location.key}
                  path={['/createReservation', '/editReservation/:id']}
                  component={ReservationForm}
                />
                <Route path="/profile/:username" component={ProfilePage} />
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
