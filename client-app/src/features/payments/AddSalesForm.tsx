import React, { useContext, useState } from 'react'
import { Form, Grid, Segment, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

const validate = combineValidators({
    lastName: isRequired('Last Name'),
  });
  interface DetailParams {
    id: string;
  }

const AddSalesForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history,
}) => {
    let [val0] = useState('');
    const rootStore = useContext(RootStoreContext);
    const [loading, setLoading] = useState(false);

    const handleFinalFormSubmit = ( data:any) => {
        val0 = data.value;
    }
    return (
        <Grid>
            <Grid.Column width={9}>
                <h2>KANE REALTY</h2>
                <p>Butuan City, Agusan del Norte</p>
                <p>TIN: 309-126-627-000</p>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Image
                                    circularcenterd
                                    size='small'
                                    src='/assets/user.png'
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(AddSalesForm)
