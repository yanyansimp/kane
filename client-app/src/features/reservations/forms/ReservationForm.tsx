import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
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
    }

    return (
      <Grid>

        <Grid.Column width={16}>
          <StepGuide />
        </Grid.Column>

        <Grid.Column width={16}>
           { renderForm() }
        </Grid.Column>

        <Grid.Column width={16}>
          { step > 1 && 
            <Button 
                content="Back" 
                primary
                type="button"
                onClick={prevStep}
            /> }

          <Button 
            content="Next" 
            type="button"
            secondary 
            onClick={nextStep}
            />
        </Grid.Column>

      </Grid>
    );
}

export default observer(ReservationForm)
