import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, } from 'semantic-ui-react'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from "react-images-uploading"
import AddpropertyTypeForm from './AddpropertyTypeForm'
import { RootStoreContext } from '../../app/stores/rootStore'
import { v4 as uuid } from 'uuid';
import{
    Typography,
    Button,
    Grid,
    Checkbox,
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton
} from '@material-ui/core'
import { keys, values } from 'mobx'
import SelectInput from '../../app/common/form/SelectInput'
import { category } from '../../app/common/options/categoryOptions'
import { observer } from 'mobx-react-lite'



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
        width: '50%', 
        marginBottom: '1rem'
    },
    drpdwnField: {
        marginRight: '70px',
        width: '50%', 
        marginBottom: '1rem'
    },
    uploadbutton:{
        top: '-50px',
        left: '400px',
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
        width: '20%',
        height: '3rem',
        left: '550px',
        background: 'teal',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    

})

const optionsArray = [
    { key: 1, text: 'Available', value: 'Available' },
    { key: 2, text: 'Reserved', value: 'Reserved' },
    { key: 3, text: 'Occupied', value: 'Occupied' },
  ]

 


// ADD PROPERTY

const AddPropertyForm = () => { 
    const rootStore = useContext(RootStoreContext);
    const { loadPropertyTypes, propertyTypeRegistry, } = rootStore.propertyTypeStore;
    const {property, createProperty} = rootStore.propertyStore;
    let [val0] = useState('');
    let [val1] = useState('');
    let [val2] = useState('');
    let [val3] = useState('');
    let [val4] = useState('');
    
    useEffect(() => {
        loadPropertyTypes()
    }, [loadPropertyTypes]);

    const classes = useStyles()
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
    ) => {
      console.log(imageList, addUpdateIndex);
      setImages(imageList as never[]);
    };

   const handleDropDownSelectStatus = (event:any, data:any) => {
    val4 = data.value;
   };

   const handleDropDownSelectPropertyType = (event:any, data:any) => {
     val0 = data.value;
   };
   
  
    
    return (
        <div className={classes.mainContainer}>
           <Typography 
           variant='h5' 
           style={{ color: '#999', textAlign: 'center' }}
           >
           Sign Up for Adding Properties
           </Typography>
           <div>

                <form>
                <div className={classes.drpdwnField}>
                    
                    <Dropdown 
                        placeholder='Select Property'
                        variant='outlined'
                        fluid
                        selection
                        onChange={handleDropDownSelectPropertyType}
                        options={propertyTypeRegistry}
                                              
                    />
                   
                </div>
                <AddpropertyTypeForm/>
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
                <div>

                <div className={classes.drpdwnField}>
                    
                     <Dropdown 
                        placeholder='Status'
                        variant='outlined'
                        search     
                        fluid
                        selection
                        onChange={handleDropDownSelectStatus} 
                        options={optionsArray}
                    />
                </div>
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
                            className={classes.btn}
                                variant='contained'
                                type='submit'
                                onClick={() => {
                                    let newVal = {
                                        id: uuid(),
                                        name: val1,
                                        description: val2,
                                        location: val3,
                                        status: val4,
                                        propertyTypeId: val0
                                    };
                                    createProperty(newVal!);
                                }}
                            >
                                SUBMIT
                            </Button>
                    </>
                </form>
            </div>
        </div>
    )
}
export default observer(AddPropertyForm);


