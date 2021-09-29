import React, { useContext, useState } from 'react'
import ReactCircleModal from 'react-circle-modal'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Image, Input, Grid, Tab, Table, Segment, Loader, Dimmer  } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { v4 as uuid } from 'uuid';
import{
    Typography,
    Button,
    TextField,
    TextareaAutosize 
} from '@material-ui/core'
import PhotoUpload from './photoUpload/PhotoUpload';


const useStyles = makeStyles({
    mainContainer: {
        display: 'grid',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5
    },
    formContainer: {
        position: 'relative',
        with: '28.12',
        height: 'auto',
        padding: '2rem'
    },
    inputField: {
        marginRight: '21px',
        width: '100%', 
        marginBottom: '1rem'
    },
    inputField1: {
        width: '40%', 
        marginBottom: '1rem'
    },

    uploadbutton:{
        top: '30px',
        right: '0px',
        width: '40%',
        height: '3.5rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    btnUplaodRemove:{
        top: '-10px',
        right: '-120px',
        width: '40%',
        height: '3.5rem',
        background: '#eaf56e',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },

    btn: {
        top: '-55px',
        right: '-320px',
        width: '40%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    btn1: {
        right: '-520px',
        width: '30%',
        height: '3rem',
        background: 'teal',
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
        background: 'red',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
      },

})

const container = {
    // top: '-250px',
    backgroundColor: 'transparent',
    border: 'transparent',
    display: 'grid',
    position: 'relative',
    zIndex: 5
  };

const AddpropertyTypeForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {propertyType, createPropertyType, submitting, loading} = rootStore.propertyTypeStore;
    let [val1] = useState('');
    let [val2] = useState('');
    let [val3] = useState('');
    const [isLoading, setLoading] = useState(false);
    const classes = useStyles()
  return (
    <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12} style={container}>
          <ReactCircleModal
      backgroundColor="#fff"
      toogleComponent={onClick => (
        <Button 
        variant='contained'
        className={classes.btn}
        onClick={onClick}>
          Add Property Type
        </Button>
      )}
      // Optional fields and their default values
      offsetX={0}
      offsetY={0}
    >
      {(onClick) => (
        <div >
           <div className={classes.mainContainer}>
           <Typography 
           variant='h5' 
           style={{ color: '#999', textAlign: 'center' }}
           >
                <Button 
                    className={classes.clsbtn}
                    onClick={onClick}>
                        X
                </Button>
         Add New Property Type
           </Typography>
           <div>
                <form>
                <div>
                    <TextField
                        className={classes.inputField} 
                                label='Name'
                                variant='outlined'
                                onChange={(e) => {
                                    val1 = e.target.value
                                }}
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Description'
                                variant='outlined'
                                onChange={(e) =>{
                                    val2 = e.target.value
                                }}
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Location'
                                variant='outlined'
                                onChange={(e) => {
                                    val3 = e.target.value
                                }}
                        />
                </div>
{/* UPLOAD IMAGE */}
               
                        <Segment>
                            <h3>Photo</h3>
                            <PhotoUpload />
                        </Segment>
                                
                    <>
                    <Button 
                            className={classes.btn1}
                                variant='contained'
                                type='button'
                                onClick={() => {
                                    setLoading(true);
                                    let newVal = {
                                        ...propertyType,
                                        id: uuid(),
                                        name: val1,
                                        description: val2,
                                        location: val3
                                    };
                                    createPropertyType(newVal!);
                                }}
                            >
                                    <Dimmer active = {isLoading} inline='centered' inverted>
                                        <Loader />
                                    </Dimmer>
                                SUBMIT
                            </Button>
                    </>
                </form>
            </div>
        </div>
         
        </div>
      )}
    </ReactCircleModal>
        </Grid.Column>
      </Grid>

    
  )
}

export default AddpropertyTypeForm
