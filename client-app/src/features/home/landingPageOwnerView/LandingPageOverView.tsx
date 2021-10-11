import { observer } from 'mobx-react-lite';
import React, { Component, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { Field } from 'react-final-form';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Button, Card, Container, Divider, Header, Icon, Input, Menu, Statistic, Image, List, Table, Step, Dropdown } from 'semantic-ui-react'
import SelectInput from '../../../app/common/form/SelectInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImageSlider from '../slidePhoto/ImageSlider';
import ModalEditAmenities from './Amenities/Common/ModalEditAmenities';
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
  const {loadAmenities, DeleteAmenities} = rootStore.amenitiesStore;
  const { loadPropertyTypes, propertyTypeRegistry, displayPropertyTypes} = rootStore.propertyTypeStore;
  const [LandingPage, setLandingPage] = useState([])
  const [footer, setfooter] = useState([])
  const [Amenities, setrAmenities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [propertyTypes, setpropertyTypes] = useState([])
  const [propid, setPropid ] = useState([]);
  
  const landfunc = (prop: any) => {
        setLandingPage(prop)
      }
  const footfunc = (prop: any) => {
    setfooter(prop)
      }
  const amenfunc = (prop: any) => {
    setrAmenities(prop)
      }
  const propFunc = (prop: any) => {
    setpropertyTypes(prop)
      }
  const delay = 4500;
  const [index2, setIndex] = useState(0);
  let timer: number;
  useEffect(() => {
        displayLandingPageHeader(landfunc)
        displayLandingPageFooter(footfunc)
        displayPropertyTypes(propFunc)
        loadAmenities(amenfunc)
        loadPropertyTypes();
        timer = window.setTimeout(() => 
                setIndex((prevIndex) => 
                  prevIndex === LandingPage.length -1 ? 0 : prevIndex + 1
                ),
                delay
        );
        return() => {};
      }, [ displayLandingPageHeader, 
        displayLandingPageFooter, 
        loadAmenities, 
        loadPropertyTypes]);
        function nextSlide(){
          setIndex(index2 === LandingPage.length - 1 ? 0 : index2 + 1);
          };
        function prevSlide (){
          setIndex(index2 === 0 ? LandingPage.length - 1 : index2 - 1);
        };
        if (!Array.isArray(LandingPage) || LandingPage.length <= 0) {
            return null;
          }
    
    const handleDropDownSelectPropertyType = (event:any, data:any) => {
      setPropid(data.value)
    };
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
                     <Header size='tiny' style={{ color: "Orange", textAlign: "center"}}>{landingpage.description} </Header>
                      <Header size='tiny' style={{ color: "Orange", textAlign: "center"}}>{landingpage.name} </Header>
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

      <Table celled >
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>AMENIITIES</Table.HeaderCell>
          <Table.HeaderCell>
            <Dropdown 
                          placeholder='Select Property'
                          variant='outlined'
                          fluid
                          selection
                          onChange={handleDropDownSelectPropertyType}
                          options={propertyTypeRegistry}
                      />
          </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
       {propertyTypes.map((properties:any) => {
          if(properties.id === propid){
            return(
              <ul>
                {properties.amenities?.map((amenities:any) => {
                  return(
                    <Table.Row>
                      <li>
                      <Table.Cell>{amenities.name}</Table.Cell>
                      <Table.Cell>{amenities.description}</Table.Cell>
                      <Table.Cell>
                          <Button circular icon onClick={() => openModal(<ModalEditAmenities name={amenities}/>)} ><Icon name='pencil' /></Button>
                          <Button circular icon onClick={() =>  DeleteAmenities(amenities.id)} ><Icon name='trash alternate outline' /></Button>
                      </Table.Cell>
                      </li>
                    </Table.Row>
                  )
                  
                })}
              </ul>
            )
          }
       })}
        </Table.Body>
      </Table>

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


  }

export default observer(LandingPageOverView)





