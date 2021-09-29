import React, {useContext, useEffect, useState } from 'react'
import { Card, Header,Segment,Image, Divider, Button, Grid} from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import NavBarLandingPage from './NavBar/NavBarLandingPage';
import HeaderSlider from './slidePhoto/HeaderSlider';
import ContactInformation from './Form/ContactInformation';
const cardStyle = {
    padding: '0px',
    borderRadius: '10px',
    width: '340px',
    display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
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
const HomePageSample = () => {
    const rootStore = useContext(RootStoreContext);
    const {displayPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setpropertyTypes] = useState([])
    const {displayLandingPageHeader, displayLandingPageFooter} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const [Footer, setFooter] = useState([])
    const [visible, setVisible] = useState(3);
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    const footerfunc = (prop: any) => {
      setFooter(prop)
    }
    const showMoreItems = () => {
      setVisible((prevValue) => prevValue + 3);
    };
    useEffect(() => {
        displayPropertyTypes(propFunc)
        displayLandingPageHeader(landfunc)
        displayLandingPageFooter(footerfunc)
    }, [displayPropertyTypes, displayLandingPageHeader, displayLandingPageFooter]);
    
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
                {propertyTypes.slice(0,visible).map((properties : any, index:any) => {  
                    return(
                    <Card raised link  style={cardStyle} href={`/properties/${properties.id}`}  key={properties.id} > 
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
            <Segment basic textAlign={"center"}>
                <Button  primary onClick={showMoreItems}  style={{textAlign: "center"}}>Load More...</Button>
            </Segment>
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



