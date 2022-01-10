import { createMedia } from '@artsy/fresnel'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import React, { Component, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, List, Segment, Image, Icon, Menu, Sidebar, Visibility } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import LoginForm from '../user/LoginForm';


let initialState: any = {};

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile } : any) => (
  <Container text>
    <Header
      as='h1'
      content='Own the Home Meant for You'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2.5em',
      }}
    />
    <Header
      as='h3'
      content='Search. See. Love.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='arrow right' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {

  state = { fixed: false};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: '1em 0em',
              // backgroundImage: "url(https://hips.hearstapps.com/edc.h-cdn.co/assets/cm/15/04/480x472/54c17a4e3c518_-_streetstyle4.png?resize=980:*)",
              // filter: brightness(50%)
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">About</Menu.Item>
                <Menu.Item as="a">Property</Menu.Item>
                <Menu.Item as="a">Contact us</Menu.Item>
                <Menu.Item position="right">
                  {/* {isLoggedIn && user ? (
                    <Image
                      as={Link}
                      to="/dashboard"
                      avatar
                      size="mini"
                      src={user.image || '/assets/user.png'}
                    />
                  ) : (
                    <Button as="a" inverted={!fixed} 
                        onClick={() => openModal(<LoginForm />)}>
                      Log in
                    </Button>
                  )} */}

                  {initialState.isLoggedIn && initialState.user ? (
                    <Image
                      as={Link}
                      to="/dashboard"
                      avatar
                      size="small"
                      src={'/assets/user.png'}
                    />
                  ) : (
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: '0.5em' }}
                      onClick={() => initialState.openModal(<LoginForm />)}
                    >
                      Login
                    </Button>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

// DesktopContainer.propTypes = {
//   children: PropTypes.node,
// }

class MobileContainer extends Component {
  state = { sidebarOpened : false}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      // <Media as={Sidebar.Pushable} at='mobile'>
      <Media at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

// MobileContainer.propTypes = {
//   children: PropTypes.node,
// }

const ResponsiveContainer = ({ children } : any) => {
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  return (
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  )
  
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Landing = () => {
     
     const rootStore = useContext(RootStoreContext);
     const { openModal } = rootStore.modalStore;
     const { isLoggedIn, user, logout } = rootStore.userStore;

    //  const [state, setState] = useState(initialState);

     useEffect(() => {
       initialState.isLoggedIn = isLoggedIn;
       initialState.user = user;
       initialState.openModal = openModal;
     }, [initialState, isLoggedIn, user, openModal]);

    return (
        <ResponsiveContainer>
            <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
            <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Companies and Individuals
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they never thought possible.
                Let us delight your customers and empower your needs in real estate.
                </p>
                {/* <Header as='h3' style={{ fontSize: '2em' }}>
                We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                bioengineered.
                </p> */}
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
                <Image bordered rounded size='large' src='/assets/placeholder.png' />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </Segment>

        <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
                </Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                "BEST realtor we’ve ever worked with."
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/assets/images/mark.png' />
                <b>Juan Dela Cruz</b> 
                </p>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to master the
            art of doing nothing by providing massive amounts of whitespace and generic content that
            can seem massive, monolithic and worth your attention.
            </p>
            <Button as='a' size='large' onClick={() => console.log(initialState)}>
            Read More
            </Button>

            <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
            <a href='#'>Case Studies</a>
            </Divider>

            <Header as='h3' style={{ fontSize: '2em' }}>
            Did We Tell You About Our Properties?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Remodeled to perfection! This beautiful home is located close to shopping and dining. Here are just a few of its wonderful features: cozy fireplace, new kitchen cabinets, stainless steel sink, modern quartz counter tops, wood flooring, remodeled bathrooms, freshly painted, central a/c, attached two-car garage, large back yard, and so much more!
            </p>
            <Button as='a' size='large'>
            I'm Still Quite Interested
            </Button>
        </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a'>Contact Us</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                            <List.Item as='a'>How To Access</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4' inverted>
                            Copyright 2021
                        </Header>
                        <h4>
                            Kane Realty
                        </h4>
                        {/* <p>
                            Powered by LappyPanda
                        </p> */}
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
        </Container>
        </Segment>
        </ResponsiveContainer>
    )
}

export default observer(Landing)
