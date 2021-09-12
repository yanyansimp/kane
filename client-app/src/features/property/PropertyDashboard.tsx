import React, {useContext,  useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Grid, Card, Header, Icon, Table, Image, Button} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore'
import Available from './statusForm/ModalAvailableForm'
import Occupied from './statusForm/ModalOccupiedForm'
import Reserved from './statusForm/ModalReservedForm'
import ModalEdit from './condition/ModalEditForm'
import ModalEditPropertyType from './condition/ModalEditPropertyTypeForm'
import ModalDeletePropertyType from './condition/ModalDeletePropertyTypeForm'




const useStyles = makeStyles({
    StatusStyle: {
        position: 'relative',
        right: '-180px',
        top: '-60px',
    },
    occupiedStyle: {
        position: 'relative',
        right: '-180px',
        top: '-100px',
    },
    reservedStyle: {
        position: 'relative',
        right: '-180px',
        top: '-146px',
    },
    nameStyle: {
        // position: 'relative',
        // justifyContent: 'center',
        // right: '-1px',
        // top: '-200px',
    },
    EditPropertyType: {
        position: 'relative',
        left: '180px',
        top: '-240px'
    },
    buttonAvailableStyle: {
        position: 'relative',
        left: '30px',
        top: '2px',
        
    },
    buttonReservedStyle: {
        position: 'relative',
        left: '30px',
        top: '-5px',
    },
    buttonOccupiedStyle: {
        position: 'relative',
        left: '32px',
        top: '-12px',
    },
    
    btn: {
        top: '1px',
        // right: '-1px',
        // width: '150%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    clsbtn: {
        top: '1px',
        right: '-500px',
        width: '10%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
      },
    
})

const cardStyle = {
    padding: '15px',
    borderRadius: '20px',
    width: '260px',
    height: '260px',
    marginBottom: '1rem'
  };

const buttonStyle = {
    position: 'relative',
    right: '40px'
  };  

const PropertyDashboard: React.FC = () => {
    const classes = useStyles()
    const rootStore = useContext(RootStoreContext);
    const {getpPropertyTypes} = rootStore.propertyTypeStore;
    
    const [propertyTypes, setPropertyTypes] = useState([])
    const propFunc = (prop: any) => {
        setPropertyTypes(prop)
    }
    useEffect(() => {
        getpPropertyTypes(propFunc)
    }, [getpPropertyTypes]);

    const [property, setParentName] = useState<string>('');
    const updateName = (name: string):void => {
    setParentName(name)
    }
    return (
        <Grid>
            <Grid.Column width={16}>
                {propertyTypes.map((propertyType, index) => {
                    return ( 
                        <Card.Group key={index}>
                        <Card style={cardStyle} raised link>
                            <Card.Content>
                                <Card.Header>
                                    <Header size="large">{propertyType[0]}</Header>
                                </Card.Header>

                                    <Card.Description  style={buttonStyle}>
                                    <div className={classes.buttonAvailableStyle}><Available  name={propertyType} /></div> 
                                    </Card.Description>

                                    <Card.Description  style={buttonStyle}>
                                    <div className={classes.buttonReservedStyle}><Reserved name={propertyType}/></div> 
                                    </Card.Description>

                                    <Card.Description  style={buttonStyle}>
                                    <div className={classes.buttonOccupiedStyle}><Occupied  name={propertyType}/></div>
                                    </Card.Description>
                                    
                            </Card.Content>
                            <Card.Content >
                            <Icon name="arrow up" /> {propertyType[2]}
                            <div className={classes.EditPropertyType}> <ModalEditPropertyType name={propertyType}/></div>
                            </Card.Content>
                        </Card>
                        </Card.Group>
                    )})}
            </Grid.Column>
        </Grid>
    )
}






export default observer(PropertyDashboard)
function num(num: any) {
    throw new Error('Function not implemented.')
  }

function propertyStatus(arg0: never) {
    throw new Error('Function not implemented.');
}
