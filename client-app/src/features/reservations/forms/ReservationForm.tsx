import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form';
import CoBorrowerAtty from './CoBorrowerAtty';
import FormsCollection from './FormsCollection';
import PersonalInfoForm from './PersonalInfoForm';
import SelectPropertyForm from './SelectPropertyForm';
import StepGuide from './StepGuide';
import WorkForm from './WorkForm';

const ReservationForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { step, nextStep, prevStep } = rootStore.reservationStore;

  const renderForm = () => {
    switch (step) {
      case 1:
        return <SelectPropertyForm />;
      case 2:
        return <PersonalInfoForm />;
      case 3:
        return <CoBorrowerAtty />;
      case 4:
        return <WorkForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <StepGuide />
      </Grid.Column>

      <Grid.Column width={16}>
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={() => (
            <Form>
              {renderForm()}

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
