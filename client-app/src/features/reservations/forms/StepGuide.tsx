import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Icon, Step } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';


const StepGuide = () => {
  const rootStore = useContext(RootStoreContext);
  const { step, nextStep, prevStep } = rootStore.reservationStore;

  return (
      <Step.Group size="mini" fluid>
        <Step
          active={step === 1 ? true : false}
          completed={step > 1 ? true : false}
        >
          <Icon name="home" />
          <Step.Content>
            <Step.Title>Property</Step.Title>
            <Step.Description>Choose property</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={step === 2 ? true : false}
          completed={step > 2 ? true : false}
        >
          <Icon name="user plus" />
          <Step.Content>
            <Step.Title>Personal Info</Step.Title>
            <Step.Description>Enter information</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={step === 3 ? true : false}
          completed={step > 3 ? true : false}
        >
          <Icon name="users" />
          <Step.Content>
            <Step.Title>Co-borrower's & Attorney in Fact</Step.Title>
            <Step.Description>
              Enter Co-borrower's & Attorney in Fact's information
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={step === 4 ? true : false}
          completed={step > 4 ? true : false}
        >
          <Icon name="building outline" />
          <Step.Content>
            <Step.Title>Work</Step.Title>
            <Step.Description>Enter work details</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={step === 5 ? true : false}
        >
          <Icon name="info" />
          <Step.Content>
            <Step.Title>Confirm Reservation</Step.Title>
            <Step.Description>Verify details</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
  );
};

export default observer(StepGuide);
