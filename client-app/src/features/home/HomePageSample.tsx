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
import HeaderSlider from './slidePhoto/HeaderSlider';
import ContactInformation from './Form/ContactInformation';

 

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
    const {displayLandingPageHeader, displayLandingPageFooter} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const [Footer, setFooter] = useState([])
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    const footerfunc = (prop: any) => {
      setFooter(prop)
  }
    useEffect(() => {
        displayPropertyTypes(propFunc)
        displayLandingPageHeader(landfunc)
        displayLandingPageFooter(footerfunc)
    }, [displayPropertyTypes, displayLandingPageHeader]);
    

    return (
        <Segment > 
                                    <NavBarLandingPage/>
                                    <HeaderSlider/>
            {/* <PriceRange/> */}
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Card.Group>
                {propertyTypes.map((properties : any, index:any) => {  
                    return(
                    <Card style={cardStyle} raised link href={`/properties/${properties.id}`}  key={properties.id} inverted> 
                     <Image src={properties.image?.url} wrapped ui={false} />
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
            <Divider hidden/>
            <Divider hidden/>
            {Footer.map((ladingpage:any) => {
               if (ladingpage.isMain === 'Footer'){
                 return(
                  <Card style={imageFooter}  >
                  <Card.Content style={{
                    textAlign: "center",
                    Width: "100%",
                    Height: "100%",
                    backgroundImage: `url(${ladingpage.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
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
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
             <ContactInformation/>
        </Segment>
    )
}

export default HomePageSample



