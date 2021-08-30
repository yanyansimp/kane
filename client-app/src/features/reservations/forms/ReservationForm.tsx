import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form';
import CoBorrowerAtty from './CoBorrowerAtty';
import FormsCollection from './FormsCollection';
import PersonalInfoForm from './PersonalInfoForm';
import SelectPropertyForm from './SelectPropertyForm';
import StepGuide from './StepGuide';
import WorkForm from './WorkFormPersonal';
import WorkFormPersonal from './WorkFormPersonal';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface DetailParams {
  id: string;
}

const ReservationForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { step, nextStep, prevStep, createReservation } = rootStore.reservationStore;

  const renderForm = () => {
    switch (step) {
      case 1:
        return <SelectPropertyForm />;
      case 2:
        return <PersonalInfoForm />;
      case 3:
        return <CoBorrowerAtty />;
      case 4:
        return <WorkFormPersonal />;
      default:
        return <PersonalInfoForm />;
    }
  };

  useEffect(() => {
    if (match.params.id) {
      
    }
  }, [])

  const handleFinalFormSubmit = (values: any) => {
    // console.log(values);
    const { ...client } = values;

    if (!client.id) {
      let newClient = {
        ...client,
      };
      createReservation(newClient);
    } else {
      
    }
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        {/* <StepGuide /> */}
        <h2>New Reservation</h2>
      </Grid.Column>

      <Grid.Column width={16}>
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <SelectPropertyForm />
              <PersonalInfoForm />
              <CoBorrowerAtty />
                
              <WorkFormPersonal />
              {/* {renderForm()}

              {step > 1 && (
                <Button
                  content="Back"
                  primary
                  type="button"
                  onClick={prevStep}
                />
              )}

              <Button
                content={step === 5 ? 'Submit' : 'Next'}
                type={step === 5 ? 'submit' : 'button'}
                secondary
                onClick={nextStep}
              /> */}
              <Button
                // loading={submitting}
                // disabled={loading || invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
            </Form>
          )}
        />
      </Grid.Column>

      <Grid.Column width={16}></Grid.Column>
    </Grid>
  );
};

export default observer(ReservationForm);
