import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from "react-images-uploading";
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
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import SendSharpIcon from '@material-ui/icons/SendSharp'

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
        width: '50%', 
        marginBottom: '1rem'
    },
    drpdwnField: {
        marginRight: '70px',
        width: '30%', 
        marginBottom: '1rem'
    },
    uploadbutton:{
        top: '-50px',
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
        width: '100%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    

})

const options = [
    { key: 'Lot', text: 'Lot area', value: 'Lot' },
    { key: 'Fillinvest', text: 'Fillinvest', value: 'Fillinvest' },
    { key: 'Camella', text: 'Camella', value: 'Camella' },
    { key: 'Lumina', text: 'Lumina', value: 'Lumina' },
  ]


// UPLOAD IMAGE



const AddPropertyForm = () => { 
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
                   
                    // label='Select Property'
                    placeholder='Select Property'
                    variant='outlined'
                    search
                    fluid
                    selection
                    allowAdditions
                    options={options}
                    />
                </div>
                <div>
                    <TextField
                        className={classes.inputField} 
                                label='City/Municipality'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Brgy'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Purok'
                                variant='outlined'
                        />
                </div>
{/* UPLOAD IMAGE */}
                <div>
                        <TextField
                            // className={classes.inputField} 
                                    label='Contract Price'
                                    variant='outlined'
                         />

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
                                // endIcon={<SendShareIcon/>}
                            >
                                SUBMIT
                            </Button>
                    </>
                </form>
            </div>
        </div>
    )
}
export default AddPropertyForm
