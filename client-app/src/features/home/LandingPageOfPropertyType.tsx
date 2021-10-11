import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Divider, Grid, Header, Icon, Image, Label, List, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import NavBarLandingPage from './NavBar/NavBarLandingPage';
import ModalViewForm from './modalView/ModalViewForm';
import Formvisitor from './Form/FormVisitor';
import ContactInformation from './Form/ContactInformation';
import ImageSlider from './slidePhoto/ImageSlider';
 
  const HeadText = {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: "50px",
  }  
  const PropertiesBoby = {
    marginLeft: 'auto',
    marginRight: 'auto'
  } 
  const image = {
    width: "78%",
    height: "100%",
    top:"50px",
    left: "50px"
  }

const LandingPageOfPropertyType = () => {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore;
    const {displayPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setpropertyTypes] = useState([])
    const [visible, setVisible] = useState(3);
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    useEffect(() => {
        displayPropertyTypes(propFunc)
    }, [displayPropertyTypes ]);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
      };
    return (

      <Grid>
          <Grid.Column>
             {propertyTypes.map((properties:any)=>{
                 if(properties.id === id){
                    return(
                        <><Card.Content 
                        className="slide"
                        alt={image}
                        style={{
                            textAlign: "center",
                            Height: "100%",
                            Width: "100%",
                            backgroundImage: `url(${properties.image?.url !=null ? properties.image?.url : '/assets/placeholder.png'})`,
                            backgroundSize: "cover",
                            backgroundPosition: 'center',
                        }}>
                           
                        </Card.Content>
                        <NavBarLandingPage/>
                            <Header.Subheader>
                            <Divider hidden/>
                            <Divider hidden/>
                                    <List>
                                        <List.Item>
                                        <Header as="h5"> {properties.name}</Header>
                                        </List.Item>
                                    </List>
                                    <Divider hidden/>
                                    <Divider hidden/>
                                    <Divider hidden/>
                                    <List>
                                        <List.Item>
                                        <Header as="h5">DESCRIPTION</Header>
                                        <List.List>
                                            <List.Item>{properties.description}</List.Item>
                                        </List.List>
                                        </List.Item>
                                    </List>
                            </Header.Subheader>
                            <Header as="h5">AMENITIES</Header>
                                {properties.amenities?.map((amenitiy:any) => {
                                    return(
                                        <List bulleted>
                                            <List.Item>
                                            {amenitiy.name}
                                            <List.List>
                                                <List.Item>{amenitiy.description}</List.Item>
                                            </List.List>
                                            </List.Item>
                                        </List>
                                    )
                                    
                                })}

                        <Header.Content >
                        
                            <Card.Group>
                            {properties.properties?.slice(0,visible).map((property:any, index:any) => {
                                if(property.status === "Available"){
                                    return(
                                        <Card raised link style={PropertiesBoby} onClick={() => openModal(<ModalViewForm name={property}  />)}>
                                            <Image src={property.image?.id !=null ? property.image?.url  : '/assets/placeholder.png'} wrapped ui={false} />
                                            <Card.Content>
                                                <Card.Header>{property.name}</Card.Header>
                                                <Card.Meta>
                                                    <span className='date'>{property.location}</span>
                                                </Card.Meta>
                                                <Card.Description>
                                                   {property.description.substring(0, 50)+ '...'}
                                                </Card.Description>
                                            </Card.Content>
                                            {/* <Card.Content extra>
                                                <a>
                                                    Contract Price
                                                    <Icon name='dollar sign' />
                                                    10,000
                                                </a>
                                            </Card.Content> */}
                                        </Card>
                                    )
                                }
                               
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
        <Segment basic textAlign={"center"}>
            <Button  primary onClick={showMoreItems}  style={{textAlign: "center"}}>Load More...</Button>
        </Segment>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
             <ImageSlider/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
        <Divider/>
            {/* <Formvisitor/> */}
            <ContactInformation/>
          </Grid.Column>
      </Grid>
    )
}
export default LandingPageOfPropertyType



