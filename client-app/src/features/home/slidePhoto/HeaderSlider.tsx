import React, { useContext, useEffect, useState } from 'react'
import { Card, Container, Divider, Grid, Header, Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';

const slideshow = {
  margin: "0 auto",
  overflow: "hidden",
  maxWidth: "5700px"
}
 const image = {
    width: "78%",
    height: "100%",
    top:"50px",
    left: "50px"
  }
const rightArrow = {
    position: "absolute",
    top: "80%",
    right: "32px",
    fontSize: "3rem",
    color: "#000",
    zIndex: "10",
    cursor: "pointer",
    userSelect: "none",
  }
const leftArrow = {
    position: "absolute",
    top: "80%",
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

const HeaderSlider = () => {
    const rootStore = useContext(RootStoreContext);
    const {displayLandingPageHeader} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    const delay = 10000;
    const [index2, setIndex] = useState(0);
    let timer: number;
    
    function resetTimeout() {
      if (timer) {
        clearTimeout(timer);
      }
    }
  
    useEffect(() => {
      resetTimeout();
      displayLandingPageHeader(landfunc)
        timer = window.setTimeout(() => 
              setIndex((prevIndex) => 
                prevIndex === LandingPage.length - 1 ? 0 : prevIndex + 1 
              ),
              delay
          );
          return() => {
            resetTimeout();
          };
    }, [index2, displayLandingPageHeader]);
    function nextSlide(){
      setIndex(index2 === LandingPage.length - 1 ? 0 : index2 + 1);
      resetTimeout();
      };
    function prevSlide (){
      setIndex(index2 === 0 ? LandingPage.length - 1 : index2 - 1);
      resetTimeout();
    };
    if (!Array.isArray(LandingPage) || LandingPage.length <= 0) {
        return null;
      }
    return (
        <Container style={slideshow}>
       {/* <Step style={leftArrow}><FaArrowAltCircleLeft  onClick={prevSlide}/></Step>
       <Step style={rightArrow}><FaArrowAltCircleRight  onClick={nextSlide}/></Step> */}
       <div
          className="slideshowSlider"
         style={{ transform: `translate3d(${-index2 * 100}%, 0, 0)` }}
       >
            {LandingPage.map((slide:any, index) => {
              if(slide.isMain === "Header"){
                return(
                  <Card.Content
                  className="slide"
                  alt={image}
                  style={{
                    textAlign: "center",
                    backgroundImage: `url(${slide.url})`,
                    Width: "100%",
                    Height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                </Card.Content>
                )
              }
            })}
            
       </div>
              <div className="slideshowDots">
                    {LandingPage.map((slide:any,idx) => {
                      if(slide.isMain === "Header"){
                        return(
                          <div key={idx} className={`slideshowDot${index2 === idx ? " active" : ""}`} 
                          onClick={() => {
                           setIndex(idx);
                         }}></div>
                        )
                      }
                      
                })}
              </div>
      
     

   </Container>
    )
}

export default HeaderSlider
