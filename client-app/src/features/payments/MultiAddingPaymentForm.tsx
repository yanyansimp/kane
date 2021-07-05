import React from 'react'
import ReactCircleModal from 'react-circle-modal'
import {makeStyles} from '@material-ui/core/styles'
import { Dropdown } from 'semantic-ui-react'
import ImageUploading, { ImageListType } from "react-images-uploading"

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
      width: '15%', 
      marginBottom: '1rem'
  },
  drpdown: {
    top: '-3px',
    marginRight: '21px',
    width: '20%', 
    marginBottom: '1rem'
},
  inputField1: {
      width: '50%', 
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
  newbtn: {
    top: '44px',
    right: '-588px',
    width: '20%',
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



const NewClientPayment = () => {
  const classes = useStyles();
  return (
    <ReactCircleModal
      backgroundColor="#fff"
      toogleComponent={onClick => (
        <div>
          <Button
            variant='contained'
            className={classes.newbtn}
            onClick={onClick}>
            Add Multi Payment
          </Button>
        </div>
      )}
      // Optional fields and their default values
      offsetX={0}
      offsetY={0}
    >
      {(onClick) => (
        <div style={{ backgroundColor: '#fff', padding: '1em' }}>
          <div className={classes.mainContainer}>
           <Typography 
           variant='h5' 
           style={{ color: '#999', textAlign: 'center' }}
           >
              <Button 
              variant='contained'
              className={classes.clsbtn}
              onClick={onClick}>
                CLOSE
              </Button>
           Multi Adding Payments
           </Typography>
           <div>

                <form>
                
                <div>
                    <div >
                    
                    
                        <TextField
                        className={classes.inputField} 
                                label='Transaction Type'
                                variant='outlined'
                        />
                         <TextField
                        className={classes.inputField} 
                                label='Last Name.'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='First Name'
                                variant='outlined'
                        />
                         <TextField
                        className={classes.inputField} 
                                label='Middle Name'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Account No.'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Contact No.'
                                variant='outlined'
                        />
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
                                label='Purok/Street'
                                variant='outlined'
                        />
                        <TextField
                        className={classes.inputField} 
                                label='Brgy'
                                variant='outlined'
                        />
                        <TextField
                            className={classes.inputField}
                                label='Check No.'
                                variant='outlined'
                        />
                        <TextField
                                className={classes.inputField}
                                label='Bank'
                                variant='outlined'
                        />
                        <TextField
                                className={classes.inputField}
                                label='Branck'
                                variant='outlined'
                        />
                        <TextField
                                className={classes.inputField}
                                label='In Payment of'
                                variant='outlined'
                        />
                            <TextField
                                className={classes.inputField}
                                label='Payment Amount'
                                variant='outlined'
                        />
                    </div>
                       
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

        </div>
      )}
    </ReactCircleModal>
  )
}

export default NewClientPayment