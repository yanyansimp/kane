import React, { useContext, useEffect, useState } from 'react'
import { Card, Divider, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import NavBarLandingPage from './NavBar/NavBarLandingPage';
import ModalViewForm from './modalView/ModalViewForm';
import Formvisitor from './Form/FormVisitor';
import ContactInformation from './Form/ContactInformation';
import { Field } from 'react-final-form';
import ImageSlider from './slidePhoto/ImageSlider';


const propType = {
    color: "black", 
    textAlign: 'left',
    margintop: '-200px',
   
  }  
  const HeadText = {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    // margin: "20px",
    padding: "50px",
    // fontFamily: 'https://fonts.googleapis.com/css?family=Roboto&display=swap', 
  }  
  const PropertiesBoby = {
    marginLeft: 'auto',
    marginRight: 'auto'
  } 

const LandingPageOfPropertyType = () => {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore;
    const {displayPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setpropertyTypes] = useState([])
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    useEffect(() => {
        displayPropertyTypes(propFunc)
    }, [displayPropertyTypes ]);
    return (

      <Grid>
          <Grid.Column>
             {propertyTypes.map((properties:any)=>{
                 if(properties.id === id){
                    return(
                        <><Header style={{
                            height: "700px",
                            backgroundImage: `url(${properties.image.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                           
                        </Header>
                        <NavBarLandingPage/>
                        <Header.Subheader style={HeadText}>
                                    <Header>{properties.name}</Header>
                                    <Divider hidden/>
                                    <Divider hidden/>
                                    <Divider hidden/>
                                    <Divider hidden/>
                                    <Header as="h5">DESCRIPTION</Header>
                                    <Header as="h5" >{properties.description}</Header>
                            </Header.Subheader>
                       
                        <Header.Content >
                            <Card.Group>
                            {properties.properties?.map((property:any, index:any) => {
                                return(

                                    <Card raised link style={PropertiesBoby} onClick={() => openModal(<ModalViewForm name={property}  />)}>
                                        <Image src={property.image.url} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>{property.name}</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>{property.location}</span>
                                            </Card.Meta>
                                            <Card.Description>
                                               {property.description.substring(0, 50)+ '...'}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a>
                                                Contract Price
                                                <Icon name='dollar sign' />
                                                10,000
                                            </a>
                                        </Card.Content>
                                    </Card>
                                   

                                )
                            })}
                            </Card.Group>
                        </Header.Content>
                        </>
                    )
                 }
                 
             })}
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
             <ImageSlider/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider/>
            <Formvisitor/>
            <ContactInformation/>
          </Grid.Column>
      </Grid>
    )
}
export default LandingPageOfPropertyType



