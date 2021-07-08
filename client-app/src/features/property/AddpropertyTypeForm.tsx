import React, { useContext, useState } from 'react'
import ReactCircleModal from 'react-circle-modal'
import { Dropdown } from 'semantic-ui-react'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Image, Input, Grid, Tab, Table } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { v4 as uuid } from 'uuid';
import{
    Typography,
    Button,
    Checkbox,
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton
} from '@material-ui/core'


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
        width: '30%', 
        marginBottom: '1rem'
    },
    inputField1: {
        width: '40%', 
        marginBottom: '1rem'
    },

    uploadbutton:{
        top: '30px',
        right: '-220px',
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
        right: '-120px',
        width: '40%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    btn1: {
        top: '100px',
        right: '-520px',
        width: '40%',
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





const AddpropertyTypeForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {propertyType, createPropertyType} = rootStore.propertyTypeStore;
    let [val1] = useState('');
    let [val2] = useState('');
    let [val3] = useState('');
    
    const classes = useStyles()
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
  
    const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
    ) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList as never[]);
    };

  return (
    <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}>
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
            CLOSE
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
                                label='Descriptopn'
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
                <div>
                        
                         <ImageUploading
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <Button 
                                className={classes.uploadbutton} 
                                style={isDragging ? { color: "red" } : undefined}
                                onClick={onImageUpload}
                               
                                >
                               UPLOAD IMAGE OF PROPERTY
                               
                                </Button>
                                {imageList.map((image, index) => (
                                <div className="image-item">
                                    <img src={image.dataURL} alt="" width="500" />
                                    <div className="image-item__btn-wrapper">
                                        <Button className={classes.btnUplaodRemove} onClick={() => onImageUpdate(index)}>Update</Button>
                                        <Button className={classes.btnUplaodRemove} onClick={() => onImageRemove(index)}>Remove</Button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>   
                </div>       
                        
                      
                    <>
                            <Button 
                            className={classes.btn1}
                                variant='contained'
                                type='submit'
                                onClick={() => {
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