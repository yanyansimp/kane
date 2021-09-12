import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Divider, Header, Image, Step  } from 'semantic-ui-react';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import { styled } from '@material-ui/core';
import { RootStoreContext } from '../../../app/stores/rootStore';
// angle left, angle right


const slider = {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
 const image = {
    width: "1000px",
    height: "600px",
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
    height: '60px',
    width: '122px',
    
}
const ImageSlider = () => {
    const rootStore = useContext(RootStoreContext);
    const {displayLandingBody} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    useEffect(() => {
        displayLandingBody(landfunc)
    }, [ displayLandingBody]);
    const [current, setCurrent] = useState(0)
    const length = LandingPage.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    if (!Array.isArray(LandingPage) || LandingPage.length <= 0) {
        return null;
      }
  return (
   <Container style={slider}>
       <Step style={leftArrow}><FaArrowAltCircleLeft  onClick={prevSlide}/></Step>
       <Step style={rightArrow}><FaArrowAltCircleRight  onClick={nextSlide}/></Step>
     {LandingPage.map((slide:any, index:any) =>{
         if(slide.isMain === "Body"){
            return (
              
                <div className={index === current ? 'slideImage activeImage' : 'slideImage'}
                key={index}
                >
                  {index === current && (
                      <>
                      <Divider hidden/>
                      <Divider hidden/>
                      <Divider hidden/>
                      <Divider hidden/>
                      <Image src={slide.url} alt="travel image" style={image} />
                      <Header as="h1" style={{ color: "white", textAlign: 'center',}}>{slide.name}</Header> 
                      <Header as="h3" style={{ color: "white", textAlign: 'center',}}> {slide.description}</Header>
                      </>
                  )}
                </div>
            )}})}
   </Container>
    )
};

export default ImageSlider;


