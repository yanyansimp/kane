import React, { Component, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { Button, Card, Container, Divider, Header, Icon, Input, Menu, Statistic, Image, List, Table } from 'semantic-ui-react'
import { RootStoreContext } from '../../../../app/stores/rootStore';

const cardStyle = {
  padding: '1px',
  borderRadius: '10px',
  width: '120px',
  marginLeft: 'auto',
  marginRight: 'auto'
};
const imageStyle = {
  width: '120px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const imageFooter = {
  height: '200px',
  width: '420px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const textBottom = {
  position: 'absolute',
  width: '50%',
  bottom:' 60px',
  color: "white"
}
const src="/assets/categoryImages/Lumina.jpg"
const MenuHeader = () => {
  const rootStore = useContext(RootStoreContext);
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
      <Card style={{  width:"450px"}}>
        {LandingPage.map((landingpage: any) => {
          if( landingpage.isMain === 'Header'){
            return(
              <Card.Content
              style={{
                height: "300px",
                width:"450px",
                backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`, //landingpage.image.url,
                backgroundSize: "cover",
              }}
            >
              <Card.Description style={{ color: "white" }}>
                        <Menu inverted style={{width:"0px"}}>
                          <Menu.Item name='home' position='left'/>
                          <Menu.Item name='messages' position='left'/>
                          <Menu.Item name='friends' position='left'/>
                          <Menu.Menu position='right'>
                              <Menu.Item name='login'/>
                              <Menu.Item>
                                <Button primary>Register</Button>
                              </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    <Card.Description textAlign="center">
                      <h5>{landingpage.name} </h5> 
                      <h6>{landingpage.description}</h6>
                  </Card.Description>
              </Card.Description>
            </Card.Content>
            )
          }
          
        })} 

            <Divider hidden/>
            <Divider hidden/>
         
          <Card.Group>
                {propertyTypes.map((propertyType : any, index:any) => {
                    return(
                    <Card style={cardStyle} raised link>
                    <Card.Content style={{
                        height: '100px',
                        backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                        backgroundSize: "cover",
                    }}>
                    </Card.Content>
                    <Card.Description  style={{ color: "black" , textAlign: 'center'}}>
                        <h5 >{propertyType.name}</h5> 
                        <h6>{propertyType.description}</h6>
                    </Card.Description>
                    </Card>
                    )
                })}
            </Card.Group>
         
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Card.Group style={imageStyle}>
                {LandingPage.map((landingpage:any) => {
                    if(landingpage.isMain === 'Body'){
                        return(
                            <Card >
                                <Card.Content style={{
                                    height: '100px',
                                    backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                                    backgroundSize: "cover",
                                }}>
                                </Card.Content>
                                <Card.Description  style={{ color: "black" , textAlign: 'center'}}>
                                    <h5 >{landingpage.name}</h5> 
                                    <h6>{landingpage.description}</h6>
                                </Card.Description>
                            </Card>
                        )
                    }
                })}
            </Card.Group>

             {LandingPage.map((ladingpage:any) => {
               if (ladingpage.isMain === 'Footer'){
                 return(
                  <Card style={imageFooter}  >
                  <Card.Content style={{
                    backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
                    backgroundSize: "cover",
                                      }}>
                    <Card.Description style={textBottom} >
                            <h5 style={{bottom:' 10px'}}>{ladingpage.name}</h5> 
                            <h6>
                                {ladingpage.description}
                            </h6>
                      </Card.Description>
                  </Card.Content>
                </Card>
                 )
               }
             })}
          



          <Divider hidden/>
          <List bulleted horizontal>
            <List.Item as='a'>About Us</List.Item>
            <List.Item as='a'>Sitemap</List.Item>
            <List.Item as='a'>Contact</List.Item>
            <List.Item as='a'>About Us</List.Item>
            <List.Item as='a'>Sitemap</List.Item>
            <List.Item as='a'>Contact</List.Item>
          </List>
      </Card>
    )
  }

export default MenuHeader

