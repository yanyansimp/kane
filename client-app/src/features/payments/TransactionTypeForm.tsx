import React from 'react'
import ReactCircleModal from 'react-circle-modal'
import {makeStyles} from '@material-ui/core/styles'
import { Dropdown } from 'semantic-ui-react'
import ImageUploading, { ImageListType } from "react-images-uploading";
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
      width: '100%', 
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
    top: '84px',
    right: '-250px',
    width: '15%',
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
            Transaction Type
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
          TRANSACTION TYPE
           </Typography>
           <div>

                <form>
                
                <div>
                    <TextField
                        className={classes.inputField} 
                                label='Transactio Type'
                                variant='outlined'
                        />
                        
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