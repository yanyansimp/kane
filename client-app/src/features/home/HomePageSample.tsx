import { makeStyles } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dropdown, Header, Menu, Segment,Image, Divider, Icon, Embed } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import ModalView from './modalView/ModalViewForm'
import LandingPageOfProperties from './LandingPageOfPropertyType';
import ModalViewform from '../property/condition/ModalViewForm'
import NavBarLandingPage from './NavBar/NavBarLandingPage';
import ImageSlider from './slidePhoto/ImageSlider';
import PriceRange from './PriceRange/PriceRange'

 

const cardStyle = {
    padding: '0px',
    borderRadius: '10px',
    width: '320px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const cardFormLogReg = {
    height: '200px',
    width: '420px',
    bottom: '-100px',
    left:'800px',
  };
 
  const propType = {
    fontFamily: 'Times New Roman', 
    color: "black", 
    textAlign: 'left',
    margintop: '-200px',
  }
const imageBody = {
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const imageFooter = {
    height: '600px',
    width: '1220px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const textBottomFooter = {
    position: 'absolute',
    width: '50%',
    bottom:' 60px',
  }
const HeadText = {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
   
}


const HomePageSample = () => {
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
                    {LandingPage.map((landingpage: any) => {
                        if( landingpage.isMain === 'Header'){
                            return(
                               <> <Header style={{
                                    height: "700px",
                                    backgroundImage: `url(${landingpage.url})`, //landingpage.image.url,
                                    backgroundSize: "1000px 600px",
                                    backgroundPosition: 'left',
                                    backgroundRepeat: 'no-repeat'
                                }}>

                                <Header.Subheader  style={HeadText}>
                                    <NavBarLandingPage/>
                                    <Header.Content >
                                        <Header as="h1" style={{color: "white", marginTop: '200px',}}>{landingpage.name}</Header>
                                        <Header as="h3" style={{color: "white",}}>{landingpage.description}</Header>
                                    </Header.Content>
                                        
                                    
                                    <Card style={cardFormLogReg}>
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
                                </Header>
                                 </>
                            )
                        }
                    })
                    }

            <PriceRange/>

            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Card.Group>
                {propertyTypes.map((properties : any, index:any) => {  
                    return(
                    <Card style={cardStyle} raised link href={`/properties/${properties.id}`}  key={properties.id} inverted> 
                     <Image src={properties.image.url} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{properties.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{properties.location}</span>
                            </Card.Meta>
                            <Card.Description>
                                {properties.description.substring(0, 50)+ '...'}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    )
                })}
            </Card.Group>


            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
           
            <ImageSlider/>
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
                    <Card.Description style={textBottomFooter} >
                            <Header as="h1" style={{ color: "white", bottom:' 10px'}} >{ladingpage.name}</Header> 
                            <Header as="h3" style={{color: "white"}}> {ladingpage.description}</Header>
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



