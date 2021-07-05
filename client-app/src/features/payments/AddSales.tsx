import React, {useState} from 'react'
import { Dropdown, TextArea, Input } from 'semantic-ui-react'
import {makeStyles} from '@material-ui/core/styles'
import NewClient from './NewClientPaymet'
import TransactionType from './TransactionTypeForm'
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
import { fieldSubscriptionItems } from 'final-form'
import { ClassNameMap } from '@material-ui/styles'
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
        marginRight: '5px',
        width: '30%', 
        marginBottom: '1rem'
    },
    inputRadioField: {
        top: '-145px',
        marginLeft: '1px',
        width: '30%', 
        marginTop: '1rem',
       
    },
    inputTextAreaField: {
        marginLeft: '248px',
        width: '30%', 
        marginBottom: '1rem',
        top: '-30px',       
    },
    inputCasherDrpdwn: {
        marginLeft: '500px',
        width: '30%', 
        marginBottom: '1rem',
        top: '-30px',       
    },
    inputTextAreaField1: {
        marginLeft: '495px',
        width: '30%', 
        marginBottom: '1rem',
        top: '-97px',       
    },
    inputField1: {
        marginRight: '700px',
        width: '80%', 
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
    clndrNow:{
        // width: '150px',
          top: '10px',
          right: '-220px',
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
    submt: {
        right: '-720px',
        width: '10%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },
    inpt:{
        right: '-460px',
        width:'30%'
      },
      btnadd: {
        top: '-50px',
        right: '-250px',
        width: '30%',
        height: '3rem',
        background: 'orange',
        color: '#fff',
        '&:hover':{
            color:'red'
        }
    },

})





// function CalendarNow() {
//     const [value, onChange] = useState(new Date());
  
//     return (
//       <div>
//         <Calendar
//           onChange={onChange}
//           value={value}
//         />
//       </div>
//     );
//   }



//   const DateNow = () => {
//       <p>hel</p>
    
//   }
  

const options = [
    { key: 'Lot', text: 'Lot area', value: 'Lot' },
    { key: 'Fillinvest', text: 'Fillinvest', value: 'Fillinvest' },
    { key: 'Camella', text: 'Camella', value: 'Camella' },
    { key: 'Lumina', text: 'Lumina', value: 'Lumina' },
  ]

function renderComponent(displaycolor: undefined, classes: ClassNameMap<"mainContainer" | "formContainer" | "inputField" | "inputRadioField" | "inputField1" | "drpdwnField" | "uploadbutton" | "btnUplaodRemove" | "clndrNow" | "btn" | "submt" | "inpt" | "btnadd">) {
    const name = displaycolor;
    if (name === 'Check') {
      return(
        <div>
          <TextField
               className={classes.inputRadioField}
                label='Check No.'
                variant='outlined'
        /><br/>
        <TextField
                className={classes.inputRadioField}
                label='Bank'
                variant='outlined'
        /><br/>
        <TextField
                 className={classes.inputRadioField}
                label='Branck'
                variant='outlined'
        /><br/>
        </div>
      )
    } else {
      return null;
    }
  }

const AddSales = () => {
    const classes = useStyles()
    const [displaycolor, setcolor] = useState();
    let CashorCheck=['Cash','Check']
    
    
    return (
        <div className={classes.mainContainer}>
          
        <Typography 
        variant='h5' 
        style={{ color: '#999', textAlign: 'center' }}
        >
        <h3>KANE REALTY</h3>
        <h6>Butuan City, Agusan del Norte</h6>
        <h6>TIN: 309-126-627-000</h6>
        </Typography>
        <Input placeholder='Search...' className={classes.inpt} />
        <TransactionType/>
        <NewClient/>
        <div>  
             <form>
                     <div className={classes.drpdwnField}>
                        <Dropdown 
                        placeholder=' Transaction Type'
                        variant='outlined'
                        search
                        fluid
                        selection
                        allowAdditions
                        options={options}
                        />
                    </div>   
                    <div>
                        {/* <CalendarNow/> */}
                        {/* <DatePicker/> */}
                    </div>      
            <div>
            <TextField
                     className={classes.inputField1} 
                             label='Ref Inv No.'
                             variant='outlined'
                     />
            </div>
                <div>
                            <p>Received From:</p>
                        <TextField
                            className={classes.inputField} 
                                    label='Last Name'
                                    variant='outlined'
                            />
                            <TextField
                            className={classes.inputField} 
                                    label='First Name'
                                    variant='outlined'
                            />
                            <TextField
                            className={classes.inputField} 
                                    label='Middle Name '
                                    variant='outlined'
                            />
                 </div>
                 <div>
                            
                        <TextField
                            className={classes.inputField} 
                                    label='Account No.'
                                    variant='outlined'
                            />
                            <TextField
                            className={classes.inputField} 
                                    label='Mobile No.'
                                    variant='outlined'
                            />
                           
                 </div>

                 <div>
                            <p>Address:</p>
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
                 </div>
                
                 <div>
                        
                            {CashorCheck.map(result=>(
                        <>
                            <input type="radio" value={result} name="radiovalues" checked={displaycolor===result} onChange={(e)=>setcolor(e.target.value)} />
                            <b>{result}</b><br/>
                        </>
                        ))}
                           <div >
                              
                           <TextField
                                    className={classes.inputTextAreaField}
                                            label='In Payment of'
                                            variant='outlined'
                                    />
                            <TextField
                                   className={classes.inputTextAreaField1}
                                            label='Payment Amount'
                                            variant='outlined'
                                    />
                           </div>
                        {renderComponent(displaycolor, classes)}
                        
                 </div>   
                 <div className={classes.inputCasherDrpdwn}>
                        <Dropdown 
                        placeholder='Cashers Incharge'
                        variant='outlined'
                        search
                        fluid
                        selection
                        allowAdditions
                        options={options}
                        />
                    </div> 
                
                         <Button 
                         className={classes.btn}
                             variant='contained'
                             type='submit'
                             // endIcon={<SendShareIcon/>}
                         >
                             SUBMIT
                         </Button>
                 
             </form>
         </div>
     </div>
    )
}

export default AddSales
