import React, { useContext, useEffect, useState } from 'react'
import { Button, Header, Image, Icon, Modal, Dropdown } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType} from "react-images-uploading";
import { useHistory } from 'react-router-dom'
import{
    Typography,
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
        with: '12',
        height: 'auto',
        padding: '2rem'
    },
    inputField: {
        background: 'white',
        marginRight: '21px',
        width: '20%', 
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
        top: '-1px',
        right: '1px',
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
const optionsArray = [
    { key: 1, text: 'Available', value: 'Available' },
    { key: 2, text: 'Reserved', value: 'Reserved' },
    { key: 3, text: 'Occupied', value: 'Occupied' },
  ]

  interface IfirstChildProps {
    name: any,
  }
  const ModalEditModal: React.FC<IfirstChildProps> = ({name}) =>  {
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext);
    const {EditProperty, loading} = rootStore.propertyStore;
    const [propName, setpropName] = useState(name.name)
    const [propDescription, setpropDescription] = useState(name.description)
    const [propLocation, setpropLocation] = useState(name.location)
    const [propStatus, setpropStatus] = useState(name.status)
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
        name.status = data.value;
        setpropStatus(name.status)
       };
    useEffect(() => {
        setChildProperty(name)
        },[name])
 let history = useHistory();
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular icon="pencil"/>}
    >
      <Modal.Header>Make a Title</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Header</Header>
          <div>
                <form>
            
                <div>
                    <TextField
                        className={classes.inputField} 
                                type='text'
                                value={propName} 
                                label='Name'
                                variant='outlined'
                                onChange={(e) =>{
                                    setpropName(e.target.value);
                                }}
                        />
                        <TextField
                        className={classes.inputField} 
                                value={propDescription}
                                label='Descriptopn'
                                variant='outlined'
                                onChange={(e) =>{
                                    setpropDescription(e.target.value);
                                }}
                        />
                        <TextField
                        className={classes.inputField} 
                                value={propLocation}
                                label='Location'
                                variant='outlined'
                                onChange={(e) => {
                                    setpropLocation(e.target.value);
                                }}
                        />
                        <Dropdown 
                          className={classes.inputField} 
                            placeholder='Status'
                            variant='outlined'
                            value={propStatus}
                            selection
                            onChange={handleDropDownSelectStatus} 
                            options={optionsArray}
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
                </form>
            </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
        <Icon name='remove' /> Cancel
        </Button>
        <Button 
            type='submit'
            color='green' 
            inverted onClick={() => {
                setOpen(false)
                let editVal = {
                    id: name.id,
                    name: propName,
                    description: propDescription,
                    location: propLocation,
                    status: propStatus,
                    propertyTypeId: name.propertyTypeId
                };
                EditProperty(editVal);
                history.push("/property");
            }}
            >
            <Icon name='checkmark' /> Submit
            </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default ModalEditModal