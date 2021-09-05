import { makeStyles } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dropdown, Header, Menu, Segment,Image, Divider } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import ModalView from './modalView/ModalViewForm'
import LandingPageOfProperties from './LandingPageOfPropertyType';
import ModalViewform from '../property/condition/ModalViewForm'

const cardStyle = {
    padding: '0px',
    borderRadius: '10px',
    width: '320px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const cardForm = {
    // padding: '0px',
    // borderRadius: '10px',
    height: '200px',
    width: '420px',
    top: '1px',
    left:'900px',
    // marginLeft: 'auto',
    // marginRight: 'auto'
  };
 
  const propType = {
    color: "black", 
    textAlign: 'left',
    margintop: '-200px',
  }
const imageStyle = {
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const imageFooter = {
    height: '600px',
    width: '1220px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const textBottom = {
    position: 'absolute',
    width: '50%',
    bottom:' 60px',
    color: "white"
  }

  const useStyles = makeStyles({
    propType:{
        margin:"1px 0",
        fontFamily: 'Times New Roman', 
    },
    HeadText:{
        color: "white", 
        textAlign: 'center',
        margin:" 200px 0"
    },
  })
  const src="/assets/categoryImages/Lumina.jpg"
const HomePageSample = () => {
    const classes = useStyles()
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const {openModal} = rootStore.modalStore;
    const {displayPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setpropertyTypes] = useState([])
    const {displayLandingPage} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    useEffect(() => {
        displayPropertyTypes(propFunc)
        displayLandingPage(landfunc)
    }, [displayPropertyTypes, displayLandingPage]);
    


    return (
        <Segment className="landingpage">
            <Header>
                    {LandingPage.map((landingpage: any) => {
                        if( landingpage.isMain === 'Header'){
                            return(
                                <Header.Content style={{
                                    height: "700px",
                                    width:"100%",
                                    backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`, //landingpage.image.url,
                                    backgroundSize: "cover",
                                }}>
                                <Header.Subheader  >
                                    <Menu size='large'>
                                        <Menu.Item name='Kane Realty'/>
                                        <Menu.Item name='messages'/>
                                        <Menu.Menu position='right'>
                                            <Menu.Item>  <Button >Login</Button> </Menu.Item>
                                            <Menu.Item> <Button primary>Sign Up</Button> </Menu.Item>
                                        </Menu.Menu>
                                    </Menu>
                                    <div className={classes.HeadText}>
                                        <h1 >{landingpage.name}</h1>
                                        <h3>{landingpage.description}</h3>
                                    </div>
                                    
                                    <Card style={cardForm}>
                                        <Card.Content inverted textAlign="center" vertical className="masthead">
                                            <Header as="h1" inverted>
                                            {/* <Image
                                                size="massive"
                                                src="/textwhiteassets/logo.png"
                                                alt="logo"
                                                style={{ marginBottom: 12, width: "30px"}}
                                            /> */}
                                            Kane Realty
                                            </Header>
                                            { isLoggedIn && user ? (
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
                                                <Header as="h2" inverted>
                                                Welcome to Kane
                                                </Header>
                                                <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
                                                Login
                                                </Button>
                                                <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
                                                Register
                                                </Button>
                                            </Fragment>
                                            )}
                                        </Card.Content>
                                    </Card>
                                </Header.Subheader>
                                </Header.Content>
                            )
                        }
                    })
                    }
            </Header>

            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Card.Group>
                {propertyTypes.map((properties : any, index:any) => {  // {`/properties/${properties.id}`}, key={properties.id}, "{"/edit/${id}"}",  {'/properties/' + properties.id}
                    return(
                    <Card style={cardStyle} raised link href={`/properties/${properties.id}`}  key={properties.id} inverted> 
                    <Card.Content style={{
                         header:'Rick Sanchez',
                         meta:'Scientist',
                        height: '200px',
                        backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                        backgroundSize: "cover",
                    }}>
                    </Card.Content>
                    <Card.Description  style={propType}>
                        <h2 >{properties.name}</h2> 
                        <h4 className={classes.propType}>{properties.location}</h4>
                        <p>{properties.description}</p>
                    </Card.Description>
                    </Card>
                    )
                })}
            </Card.Group>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Card.Group style={imageStyle}>
                {LandingPage.map((landingpage:any) => {
                    if(landingpage.isMain === 'Body'){
                        return(
                            <Card >
                                <Card.Content style={{
                                    height: '200px',
                                    backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                                    backgroundSize: "cover",
                                    
                                }}>
                                </Card.Content>
                                <Card.Description  style={{ color: "black" , textAlign: 'center'}}>
                                    <h5 >{landingpage.name}</h5> 
                                    {/* <h6>{landingpage.description}</h6> */}
                                    <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                                </Card.Description>
                            </Card>
                        )
                    }
                })}
            </Card.Group>

            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            {LandingPage.map((ladingpage:any) => {
               if (ladingpage.isMain === 'Footer'){
                 return(
                  <Card style={imageFooter}  >
                  <Card.Content style={{
                    backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                    backgroundSize: "cover",
                                      }}>
                    <Card.Description style={textBottom} >
                            <h1 style={{bottom:' 10px'}}>{ladingpage.name}</h1> 
                            <h3>
                                {ladingpage.description}
                            </h3>
                      </Card.Description>
                  </Card.Content>
                </Card>
                 )
               }
             })}
        </Segment>
    )
}

export default HomePageSample
