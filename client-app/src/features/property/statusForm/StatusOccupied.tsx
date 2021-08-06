import React from 'react'
import ReactCircleModal from 'react-circle-modal'
import { Dropdown } from 'semantic-ui-react'
import {makeStyles} from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Image, Input, Grid, Tab, Table } from 'semantic-ui-react'
import Status from './StatusForm'
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
        // top: '1px',
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
const OccupiedProp = () => {
  const classes = useStyles()
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
                                    Occupied
                                </Button>
                            )}
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
                Occupied Properties
                </Typography>
                <div>
                    <Status/>
                    </div>
                </div>
                
                </div>
            )}
            </ReactCircleModal>
        </Grid.Column>
      </Grid>

    
  )
}
export default OccupiedProp
