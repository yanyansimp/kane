import React, { Component, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Button, Card, Container, Divider, Header, Icon, Input, Menu, Statistic, Image, List, Table, Step } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import ModalEditForm from '../modalView/ModalEditForm';
import ImageSlider from '../slidePhoto/ImageSlider';

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

const slider = {
  position: "relative",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
const image = {
  width: "150px",
  height: "150px",
  borderRadius: "10px",
}
const rightArrow = {
  position: "absolute",
  top: "50%",
  right: "32px",
  fontSize: "3rem",
  color: "#000",
  zIndex: "10",
  cursor: "pointer",
  userSelect: "none",
}
const leftArrow = {
  position: "absolute",
  top: "50%",
  left: "32px",
  fontSize: "3rem",
  color: "#000",
  zIndex: "10",
  cursor: "pointer",
  userSelect: "none",
}

const sliderImage ={
  height: '30px',
  width: '80px',
  
}
const src="/assets/categoryImages/Lumina.jpg"
const MenuHeader = () => {
  const rootStore = useContext(RootStoreContext);
  // const {displayPropertyTypes} = rootStore.propertyTypeStore;
  const [propertyTypes, setpropertyTypes] = useState([])
  const {displayLandingPage, displayLandingBody} = rootStore.homePageStore;
  const {openModal} = rootStore.modalStore;
  const [LandingPage, setLandingPage] = useState([])
  const [SlidePhoto, setSlidePhoto] = useState([])
  const propFunc = (prop: any) => {
    setpropertyTypes(prop)
  }
  const landfunc = (prop: any) => {
    setLandingPage(prop)
  }
  const slidefunc = (prop: any) => {
    setSlidePhoto(prop)
}
  useEffect(() => {
    // displayPropertyTypes(propFunc)
    displayLandingPage(landfunc)
    displayLandingBody(slidefunc)
  }, [displayLandingPage, displayLandingBody]);

  const [current, setCurrent] = useState(0)
    const length = SlidePhoto.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    if (!Array.isArray(SlidePhoto) || SlidePhoto.length <= 0) {
        return null;
      }

    return (
      <Card style={{  width:"450px"}}>
        {LandingPage.map((landingpage: any) => {
          if( landingpage.isMain === 'Header'){
            return(
              <Card.Content
              style={{
                height: "300px",
                width:"450px",
                backgroundImage: `url(${landingpage.url})`, //landingpage.image.url,
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
          {propertyTypes.map((properties : any, index:any) => {  // {`/properties/${properties.id}`}, key={properties.id}, "{"/edit/${id}"}",  {'/properties/' + properties.id}
                    return(
                    <Card style={cardStyle} raised link  inverted> 
                     <Image src={properties.image.url} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{properties.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{properties.location}</span>
                            </Card.Meta>
                            <Card.Description>
                                {properties.description.substring(0, 10)+ '...'}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    )
                })}
            </Card.Group>
         
        
            <Card.Group>
            <Container style={slider}>
                <Step style={leftArrow}><FaArrowAltCircleLeft  onClick={prevSlide}/></Step>
                <Step style={rightArrow}><FaArrowAltCircleRight  onClick={nextSlide}/></Step>
              {SlidePhoto.map((slide:any, index:any) =>{
                  if(slide.isMain === "Body"){
                    console.log(slide)
                      return (
                        
                          <div className={index === current ? 'slideImage activeImage' : 'slideImage'}
                          key={index}
                          >
                            {index === current && (
                                <>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Button primary  onClick={() => openModal(<ModalEditForm name={slide}/>)} size="huge" inverted>
                                      Edit
                                </Button>
                                <Image src={slide.url} alt="travel image" style={image} />
                                <Header as="h1" style={{ color: "black", textAlign: 'center',}}>{slide.name}</Header> 
                                <Header as="h3" style={{ color: "black", textAlign: 'center',}}> {slide.description}</Header>
                                
                                </>
                            )}
                          </div>
                      )}})}
            </Container>
               
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

function openModal(arg0: JSX.Element): void {
  throw new Error('Function not implemented.');
}

