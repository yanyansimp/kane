import React, { Component, useContext, useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Button, Divider, Form, Grid, Header, Input, Segment, Select, Tab } from 'semantic-ui-react';
import { Typography } from '@material-ui/core';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import SelectInput from '../../../app/common/form/SelectInput';


const validate = combineValidators({
    // firstName: isRequired('First Name'),
    // lastName: isRequired('Last Name'),
    // ConTactNo: isRequired('ConTact No'),
    // Email: isRequired('Email'),
    // Messege: isRequired('Messege'),
  });

const component = {
	// margin: 'auto',
	display: 'block',
	width: 'fit-content',
}
const Rangeleft = {
	position: "absolute",
	right: "489px",
	top: "15px"
}
const RangeRight = {
	position: "absolute",
	right: "626px",
	top: "15px"
}


 

const PriceRange = () => {
	const rootStore = useContext(RootStoreContext);
    const { loadPropertyTypes, propertyTypeRegistry, } = rootStore.propertyTypeStore;
	const [loading, setLoading] = useState(false);
	const [Range, setRange] = React.useState([0,10]);
	const [getValue, setgetValue] = useState([0,10])
	const rangeSelector = (_event:any, newValue: any) => {
		setRange(newValue);
		setgetValue(newValue);
	}
	
	useEffect(() => {
        loadPropertyTypes()
    }, [loadPropertyTypes]);
	
	const handleFinalFormSubmit = (values: any) => {
		const { ...user } = values;
		};
	const priceResult = (values : any) => {

	}
		return (
			<Grid>
				<Grid.Column >
					<Segment>
						<FinalForm
							validate={validate}
							onSubmit={handleFinalFormSubmit}
							render={({handleSubmit, invalid, pristine}) =>(
								<Form onSubmit={handleSubmit} loading={loading} horizontal >
									<Form.Group >
										<Field 
										style={RangeRight}
										name="BaseOn"
										component="input"
										type="radio"
										value={"Base On Income:"+  "$" + Range[0] +"-" + "$" + Range[1]}
										id="Income"
										// onClick={()=> priceResult(value)}
										/>
										<Field 
										style={Rangeleft}
										name="BaseOn"
										component="input"
										type="radio"
										value={"Base On Price:" + "$" + Range[0] + "$" + Range[1]}
										id="Price"
										/>
									</Form.Group>	
									<Form.Group widths="equal">
										<Field
										name="propertyType"
										label="Property Type"
										placeholder="Property Type"
										options={propertyTypeRegistry}
										component={SelectInput}
										/>
										<Field 
										name="BaseOn"
										type="text"
										label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Base on Income&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base on Price"
										component={TextInput}
										/>
										<input 
											width= "100%"
											name="BaseOn"
											type="text" 
											value={ "Base On Price:" + "$" + Range[0] + "-" + "$" + Range[1]} 
										/>
									</Form.Group>
										<Slider
											name="Base"
											value={Range}
											onChange={rangeSelector}
											valueLabelDisplay="auto"
											/>
											 
											 {Range[0]}  -  {Range[1]} 
											
									<Button
										// loading={submitting}
										disabled={loading || invalid || pristine}
										floated="right"
										positive
										type="submit"
										content="Submit"
										/>
								</Form>
							)}
						/>
					</Segment>
					
				</Grid.Column>
			</Grid>
			
		);
}


export default PriceRange;

