import React, { useContext, useEffect, useState } from 'react'
import { Button, Header, Image, Icon, Modal,Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType} from "react-images-uploading";
import { useHistory } from 'react-router-dom'
import PhotoUploadPropTypeEdit from '../photoUpload/PhotoUploadPropTypeEdit';
import{
    TextField,
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
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [ChildProperty, setChildProperty] =  useState([name])
    const rootStore = useContext(RootStoreContext);
    const {EditPropertyType} = rootStore.propertyTypeStore
    const [propId, setpropId] = useState(name[6])
    const [propName, setpropName] = useState(name[0])
    const [propDescription, setpropDescription] = useState(name[1])
    const [propLocation, setpropLocation] = useState(name[7])
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        setChildProperty(name)
        },[name])
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular icon="pencil"/>}
    >
      <Modal.Header>Editing of Property Type</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>{propName}</Header>
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
                    
                        
                </div>
{/* UPLOAD IMAGE */}
                        <Segment>
                            <h3>Photo</h3>
                            <PhotoUploadPropTypeEdit />
                        </Segment>     
                </form>
            </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
        <Icon name='remove' /> Cancel
        </Button>
        <Button 
            loading={isLoading}
            type='button'
            color='green' 
            inverted onClick={() => {
                setLoading(true);
                let editVal = {
                    id: propId,
                    name: propName,
                    description: propDescription,
                    location: propLocation,
                };
                EditPropertyType(editVal);
                setOpen(true)
                
            }}
            >
            <Icon name='checkmark' /> Submit
            </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default ModalEditModal