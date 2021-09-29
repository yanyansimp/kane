import React, { Component, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Button, Card, Container, Divider, Header, Icon, Input, Menu, Statistic, Image, List, Table, Step } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImageSlider from '../slidePhoto/ImageSlider';
import ModalEditForm from './HeaderOverView/edit/ModalEditForm'

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
  top: "60%",
  right: "70px",
  fontSize: "3rem",
  color: "#000",
  zIndex: "10",
  cursor: "pointer",
  userSelect: "none",
}
const leftArrow = {
  position: "absolute",
  top: "60%",
  left: "60px",
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
const LandingPageOverView = () => {
  const rootStore = useContext(RootStoreContext);
  const {openModal} = rootStore.modalStore;
  const {displayLandingPageHeader, displayLandingPageFooter, DeleteLandingPage} = rootStore.homePageStore;
  const [LandingPage, setLandingPage] = useState([])
  const [footer, setfooter] = useState([])
  const [isLoading, setLoading] = useState(false);
  const landfunc = (prop: any) => {
        setLandingPage(prop)
      }
  const footfunc = (prop: any) => {
    setfooter(prop)
      }
      const delay = 4500;
    const [index2, setIndex] = useState(0);
    let timer: number;
  useEffect(() => {
        displayLandingPageHeader(landfunc)
        displayLandingPageFooter(footfunc)
        timer = window.setTimeout(() => 
                setIndex((prevIndex) => 
                  prevIndex === LandingPage.length -1 ? 0 : prevIndex + 1
                ),
                delay
        );
        return() => {};
      }, [ displayLandingPageFooter ]);
        function nextSlide(){
          setIndex(index2 === LandingPage.length - 1 ? 0 : index2 + 1);
          };
        function prevSlide (){
          setIndex(index2 === 0 ? LandingPage.length - 1 : index2 - 1);
        };
        if (!Array.isArray(LandingPage) || LandingPage.length <= 0) {
            return null;
          }
      
   
return(
    <Container style={{width:"450px"}}>
      <div
         className="slideshowSlider"
      >
        {LandingPage.map((landingpage:any, index) =>{
              return(
                <div className={index === index2 ? 'slideImage activeImage' : 'slideImage' }>
                  {index === index2 && (
                    <Card.Content
                    className="slide"
                    style={{
                      height: "300px",
                      width: "450px",
                      backgroundImage: `url(${landingpage.url})`,
                      backgroundSize: "cover",
                    }}
                    >
                      <Button primary  onClick={() => openModal(<ModalEditForm name={landingpage}/>)} size="huge" inverted>
                        Edit
                     </Button>
                     <Button loading={isLoading} onClick={(e) => { setLoading(true); DeleteLandingPage(landingpage.id)}} >Delete</Button>
                      <Step style={leftArrow}><FaArrowAltCircleLeft  onClick={prevSlide}/></Step>
                      <Step style={rightArrow}><FaArrowAltCircleRight  onClick={nextSlide}/></Step>
                  </Card.Content>
                  )}
                </div>
              )
          })}
      </div>
      <div className="slideshowDots">
          {LandingPage.map((_,idx) => (
              <div key={idx} className={`slideshowDot${index2 === idx ? " active" : ""}`} 
              onClick={() => {
              setIndex(idx);
            }}></div>
          ))}
      </div>

      <Header>Footer</Header>
      {footer.map((footer:any)=>{
           return(
            <Card>
               <Card.Content style={{
                    height: "300px",
                    width: "450px",
                    backgroundImage: `url(${footer.url})`,
                    backgroundSize: "cover",
                                      }}>
             <Button primary  onClick={() => openModal(<ModalEditForm name={footer}/>)} size="huge" inverted>
                        Edit
                     </Button>
                     <Button loading={isLoading} onClick={(e) => { setLoading(true); DeleteLandingPage(footer.id)}} >Delete</Button>
                    <Card.Description style={textBottom} >
                            <h5 >{footer.name}</h5> 
                            <h6>
                                {footer.description}
                            </h6>
                      </Card.Description>
                  </Card.Content>
            </Card>
           )
      })}
    </Container>
    
  )
//   const rootStore = useContext(RootStoreContext);
//   const {displayPropertyTypes} = rootStore.propertyTypeStore;
//   const [propertyTypes, setpropertyTypes] = useState([])
//   const {displayLandingPageHeader, displayLandingBody} = rootStore.homePageStore;
//   const [LandingPage, setLandingPage] = useState([])
//   const [SlidePhoto, setSlidePhoto] = useState([])
//   const propFunc = (prop: any) => {
//     setpropertyTypes(prop)
//   }
//   const landfunc = (prop: any) => {
//     setLandingPage(prop)
//   }
//   const slidefunc = (prop: any) => {
//     setSlidePhoto(prop)
// }
//   useEffect(() => {
//     displayPropertyTypes(propFunc)
//     displayLandingPageHeader(landfunc)
//     displayLandingBody(slidefunc)
//   }, [displayPropertyTypes, displayLandingPageHeader, displayLandingBody]);

//   const [current, setCurrent] = useState(0)
//     const length = SlidePhoto.length;
//     const nextSlide = () => {
//         setCurrent(current === length - 1 ? 0 : current + 1);
//       };
//     const prevSlide = () => {
//         setCurrent(current === 0 ? length - 1 : current - 1);
//     };
//     if (!Array.isArray(SlidePhoto) || SlidePhoto.length <= 0) {
//         return null;
//       }
//     return (
//       <Card style={{  width:"450px"}}>
//         {LandingPage.map((landingpage: any) => {
//             return(
//               <Card.Content
//               style={{
//                 height: "300px",
//                 width:"450px",
//                 backgroundImage: `url(${landingpage.url})`, 
//                 backgroundSize: "cover",
//               }}
//             >
//             </Card.Content>
//             )
//         })} 

//             <Divider hidden/>
//             <Divider hidden/>
         
//           <Card.Group>
//           {propertyTypes.map((properties : any, index:any) => {  // {`/properties/${properties.id}`}, key={properties.id}, "{"/edit/${id}"}",  {'/properties/' + properties.id}
//                     return(
//                     <Card style={cardStyle} raised link  inverted> 
//                      <Image src={properties.image.url} wrapped ui={false} />
//                         <Card.Content>
//                             <Card.Header>{properties.name}</Card.Header>
//                             <Card.Meta>
//                                 <span className='date'>{properties.location}</span>
//                             </Card.Meta>
//                             <Card.Description>
//                                 {properties.description.substring(0, 10)+ '...'}
//                             </Card.Description>
//                         </Card.Content>
//                     </Card>
//                     )
//                 })}
//             </Card.Group>
         
        
//             <Card.Group>
//             <Container style={slider}>
//                 <Step style={leftArrow}><FaArrowAltCircleLeft  onClick={prevSlide}/></Step>
//                 <Step style={rightArrow}><FaArrowAltCircleRight  onClick={nextSlide}/></Step>
//               {SlidePhoto.map((slide:any, index:any) =>{
//                   if(slide.isMain === "Body"){
//                       return (
                        
//                           <div className={index === current ? 'slideImage activeImage' : 'slideImage'}
//                           key={index}
//                           >
//                             {index === current && (
//                                 <>
//                                 <Divider hidden/>
//                                 <Divider hidden/>
//                                 <Button primary  onClick={() => openModal(<ModalEditForm name={slide}/>)} size="huge" inverted>
//                                       Edit
//                                 </Button>
//                                 <Image src={slide.url} alt="travel image" style={image} />
//                                 <Header as="h1" style={{ color: "black", textAlign: 'center',}}>{slide.name}</Header> 
//                                 <Header as="h3" style={{ color: "black", textAlign: 'center',}}> {slide.description}</Header>
                                
//                                 </>
//                             )}
//                           </div>
//                       )}})}
//             </Container>
               
//             </Card.Group>

//              {LandingPage.map((ladingpage:any) => {
//                if (ladingpage.isMain === 'Footer'){
//                  return(
//                   <Card style={imageFooter}  >
//                   <Card.Content style={{
//                     backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`,
//                     backgroundSize: "cover",
//                                       }}>
//                     <Card.Description style={textBottom} >
//                             <h5 style={{bottom:' 10px'}}>{ladingpage.name}</h5> 
//                             <h6>
//                                 {ladingpage.description}
//                             </h6>
//                       </Card.Description>
//                   </Card.Content>
//                 </Card>
//                  )
//                }
//              })}
          



//           <Divider hidden/>
//           <List bulleted horizontal>
//             <List.Item as='a'>About Us</List.Item>
//             <List.Item as='a'>Sitemap</List.Item>
//             <List.Item as='a'>Contact</List.Item>
//             <List.Item as='a'>About Us</List.Item>
//             <List.Item as='a'>Sitemap</List.Item>
//             <List.Item as='a'>Contact</List.Item>
//           </List>
//       </Card>
//     )
  }

export default LandingPageOverView

