import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Search, Grid, Image, Input, Button, Tab, Table, Dropdown, Icon, Pagination, Divider, Segment, Card, Header} from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import {Link, makeStyles} from '@material-ui/core'
import ModalEdit from './condition/ModalEditForm'
import ModalDelete from './condition/ModalDeleteForm'
import ModalView from './condition/ModalViewForm'
import PropertyDashboard from './PropertyDashboard'
import { useHistory } from "react-router-dom";
import AddPropertyForm from './AddpropertyForm'
import AddpropertyForm from './AddpropertyForm'

const searchBar = {
  left: '450px',
  width: '100%'
};
const pagination = {
  justifyContent: 'center',
};

const container = {
  backgroundColor: 'transparent',
  border: 'transparent',
  display: 'grid',
  position: 'relative',
  zIndex: 5
};

const Viewpropertyform:React.FC = () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const [searchTerm, setSearchTerm] = useState("");
  const rootStore = useContext(RootStoreContext);
  const {displayPropertyTypes} = rootStore.propertyTypeStore;
  const [propertyTypes, setpropertyTypes] = useState([])
  const [visible, setVisible] = useState(5);
  const [step, setStep] = useState(false);
  const propFunc = (prop: any) => {
    setpropertyTypes(prop)
  }
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };
  const [property, setParentName] = useState<string>('');
  const updateName = (name: string):void => {
    setParentName(name)
  }
  useEffect(() => {
    displayPropertyTypes(propFunc)
  }, [ displayPropertyTypes]);

  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/property");
  }
  const [showDriveAction, setShowDriveAction] = useState(false)


    return showDriveAction ?
    <AddPropertyForm/> : (
      <Grid>
        <Grid.Column width={6}>
          <Input
          style={searchBar}
          type="text"
          value={searchTerm}
          onChange={(e) =>{
              setSearchTerm(e.target.value);
          }}
          placeholder="search"
          icon='search'
        />

                    <Button  floated="right"   onClick= {() => setShowDriveAction(true)}>
                      <Icon name='plus' />
                      Add Property
                    </Button> 

                    <Grid.Column width={16} >
                    <Button primary onClick={handleRoute}>
                         <Icon name='arrow left' />
                            Back
                    </Button> 
            </Grid.Column>
      </Grid.Column>
        <Grid.Column width={12}>
        <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IMAGE</Table.HeaderCell>
            <Table.HeaderCell>PROPERTY</Table.HeaderCell>
            <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
            <Table.HeaderCell>LOCATION</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>EDIT/DELETE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {propertyTypes.map((properties:any)=>{
                 if(properties.id === id){
                    return(
                        <>
                            {properties.properties
                            ?.filter((property : any) => property.name.toLowerCase().includes(searchTerm.toLowerCase()) || property.description.toLowerCase().includes(searchTerm.toLowerCase()) || property.location.toLowerCase().includes(searchTerm.toLowerCase()) || property.status.toLowerCase().includes(searchTerm.toLowerCase()) )
                            .slice(0,visible)
                            .map((property:any, index:any) => {
                                    return(
                                      <Table.Row key={property.id} height={2}>
                                          <Table.Cell><Image size="tiny" src={property.image?.id != null ? property.image?.url : '/assets/placeholder.png'} /></Table.Cell>
                                          <Table.Cell>{property.name}</Table.Cell>
                                          <Table.Cell>{property.description.substring(0, 10)+ '...'}</Table.Cell>
                                          <Table.Cell>{property.location}</Table.Cell>
                                          <Table.Cell>{property.status}</Table.Cell>
                                          <Table.Cell><ModalView name={property} /><ModalEdit name={property}/> <ModalDelete name={property} /> </Table.Cell>
                                    </Table.Row>
                                    )})}
                        </>
                    )
                 }
                 
             })}
        
          <Divider hidden/>
            <Segment basic textAlign={"center"}>
                <Button  primary onClick={showMoreItems}  style={{textAlign: "center"}}>Load More...</Button>
            </Segment>
            <Divider hidden/>
        </Table.Body>
      </Table>
        </Grid.Column>
        <Grid.Column with={4} style={container}>
           <PropertyDashboard id={id}/>
       </Grid.Column>
      </Grid>
      
      
    );
}

export default observer(Viewpropertyform);

