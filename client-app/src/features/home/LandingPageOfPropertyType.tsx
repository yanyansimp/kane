import React, { useContext, useEffect, useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { makeStyles } from '@material-ui/styles';
   
const useStyles = makeStyles({
    HeadText:{
        position: 'absolute',
        color: "white", 
        textAlign: 'center',
        margin:" 200px 0"
    },
})
const LandingPageOfPropertyType = () => {
    const classes = useStyles()
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    const rootStore = useContext(RootStoreContext);
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
                        <Header style={{
                            height: "700px",
                            marginLeft: "-12em",
                            marginTop: "-2em",
                            backgroundImage: `url(/assets/categoryImages/Lumina.jpg)`, //landingpage.image.url,
                            backgroundSize: "cover",
                        }}>
                            <Header.Subheader>
                            <div className={classes.HeadText}>
                                        <h1 >{properties.name}</h1>
                                        <h3>{properties.description}</h3>
                                    </div>
                            </Header.Subheader>
                        </Header>
                    )
                 }
                 
             })}

          </Grid.Column>
      </Grid>
    )
}

export default LandingPageOfPropertyType


