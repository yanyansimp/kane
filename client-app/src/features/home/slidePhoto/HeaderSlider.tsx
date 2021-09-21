import React, { useContext, useEffect, useState } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
const slider = {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
const slideshow = {
  margin: "0 auto",
  overflow: "hidden",
  maxWidth: "500px"
}
 const image = {
    width: "1000px",
    height: "600px",
    borderRadius: "10px",
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
    const {displayLandingBody} = rootStore.homePageStore;
    const [LandingPage, setLandingPage] = useState([])
    const landfunc = (prop: any) => {
        setLandingPage(prop)
    }
    const delay = 4500;
    const [index2, setIndex] = useState(0);
    let timer: number;
    
    function resetTimeout() {
      if (timer) {
        clearTimeout(timer);
      }
    }
  
    useEffect(() => {
      resetTimeout();
        displayLandingBody(landfunc)
        timer = window.setTimeout(() => 
              setIndex((prevIndex) => 
                prevIndex === LandingPage.length - 1 ? 0 : prevIndex + 1 
              ),
              delay
          );
          return() => {
            resetTimeout();
          };
    }, [index2, displayLandingBody]);
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
            {LandingPage.map((slide:any, index) => (
              <div
                  className="slide"
                  key={index}
                  style={{  }}
                >
                  <div>
                    <Image src={slide.url} alt="travel image" style={image} />

                  </div>
                  
              </div>
            ))}
            
       </div>
              <div className="slideshowDots">
                    {LandingPage.map((_,idx) => (
                       <div key={idx} className={`slideshowDot${index2 === idx ? " active" : ""}`} 
                       onClick={() => {
                        setIndex(idx);
                      }}></div>
                    ))}
              </div>
      
     

   </Container>
    )
}

export default HeaderSlider
