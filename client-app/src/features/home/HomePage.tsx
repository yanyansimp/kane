import React, { useContext, Fragment } from 'react';
import {
  Container,
  Segment,
  Header,
  Label,
  Menu,
  Dropdown,
  Image,
  Input,
  Button,
} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import { observer } from 'mobx-react-lite';


const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user , logout } = rootStore.userStore;
  // const { user, logout } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (

    // <Segment inverted textAlign="center" vertical className="masthead">
    //   <Container text>
        
    //     {isLoggedIn && user ? (
    //       <Fragment>
    //         <Header
    //           as="h2"
    //           inverted
    //           content={`Welcome back ${user.displayName}`}
    //         />
    //         <Button as={Link} to="/activities" size="huge" inverted>
    //           Go to activities!
    //         </Button>
    //       </Fragment>
    //     ) : (
    //        <Fragment>
    //         {/* // <Header as="h2" inverted content="Welcome to Kiri" /> */}
    //         <Label onClick={() => openModal(<LoginForm />)} size="huge" inverted>
    //           Login
    //         </Label>
    //         {/* <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
    //           Register
    //         </Button> */}
    //      </Fragment>
    //     )}
    //   </Container>
    //   <Container text style={{color:"Black"}}>
      
    //   </Container>
    // </Segment>
 
// export const NavBar: React.FC = () => {
//   const rootStore = useContext(RootStoreContext);
//   const { user, logout } = rootStore.userStore;
//   const {openModal} = rootStore.modalStore;

  // return (
    
        <Menu fixed='top' inverted color='red'>
          <img
            src='/assets/sigmalogoo.png'
            alt='logo'
            style={{marginTop:'15px',marginLeft:'10px' ,marginRight:'5px', height: '50px',width: "55px", float: 'left'}}
          />
           <label style={{color:'white', marginTop:'30px'}}>XIANS SIGMA XI</label>
      <Container>
        <Menu.Item as={Link} to='/homeAdmin1'>
              Home
        </Menu.Item>

        <Menu.Item 
            name='Activities' 
            as={NavLink} to='/activities' 
            positive content='Activity' /> 
    
        {/* <Menu.Item
            as={NavLink}
            to='/createActivity'
            positive
            content='Create Activity'
          >
        </Menu.Item>*/}
        
        {user && (
          <Menu.Item position='right'>
           <Menu.Item>
              <Input icon='search' placeholder='Search...' style={{ width:'500px'}}/>
            </Menu.Item> 
              <Menu.Item>             
               <Image 
              // onClick={() => openModal(<Addmembers/>)}
                avatar src={user.image || '/assets/plus1.png'} 
                
              /> 
                <Dropdown pointing='top right'>
                  <Dropdown.Menu>
                  <Dropdown.Item
                  as={Link}
                  to='/addmembers'
                  text='Members Registration'
                />
                <Dropdown.Item
                  as={NavLink}
                  to='/createActivity'
                  text='Create Activity'
                />
                </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            {/* <Menu.Item>
              <Image avatar src={user.image || '/assets/bell2.png'} />
            </Menu.Item> */}
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top right' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                <Dropdown.Item
                 as={Link}
                 to='/MembersList'
                 text='Members List'
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
           <Fragment>
            {/* // <Header as="h2" inverted content="Welcome to Kiri" /> */}
            <Menu.Item onClick={() => openModal(<LoginForm />)} size="huge" inverted className="loginMenu">
              Login
            </Menu.Item>
            {/* <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button> */}
         </Fragment>
        )}
      </Container>
      
    </Menu>


  );
};

export default HomePage;
