import React, {useContext,  useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Grid, Card, Header, Icon, Table, Image, Button} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore'
// import Available from './statusForm/StatusAvailable'
// import Occupied from './statusForm/StatusOccupied'
import Available from './statusForm/ModalAvailableForm'
import Occupied from './statusForm/ModalOccupiedForm'
import Reserved from './statusForm/ModalReservedForm'




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
        position: 'relative',
        right: '-1px',
        top: '20px',
    },
    buttonAvailableStyle: {
        position: 'relative',
        left: '30px',
        top: '2px',
        
    },
    buttonResevedStyle: {
        position: 'relative',
        left: '30px',
        top: '25px',
    },
    buttonOccupiedStyle: {
        position: 'relative',
        left: '30px',
        top: '15px',
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
                                    
                                    <Header size="large">{propertyType[1]}</Header>
                                </Card.Header>

                                    <Card.Description  style={buttonStyle}>
                                       <div className={classes.buttonAvailableStyle}><Available  name={propertyType[2]}/></div> 
                                        {/* <h3 className={classes.StatusStyle}>:&nbsp;&nbsp;{propertyType[2]}</h3> */}
                                    </Card.Description>

                                    <Card.Description  style={buttonStyle}>
                                    <div className={classes.buttonOccupiedStyle}><Reserved name={propertyType[3]}/></div> 
                                        {/* <h3 className={classes.occupiedStyle}>:&nbsp;&nbsp;{propertyType[3]}</h3> */}
                                    </Card.Description>

                                    <Card.Description  style={buttonStyle}>
                                    <div className={classes.buttonResevedStyle}><Occupied  name={propertyType[4]}/></div>
                                        {/* <h3 className={classes.reservedStyle}>:&nbsp;&nbsp;{propertyType[4]}</h3> */}
                                    </Card.Description>
                                    
                            </Card.Content>
                            <Card.Content className={classes.nameStyle}>
                                <Header name="arrow up" size="large" /> {propertyType[0]}
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
