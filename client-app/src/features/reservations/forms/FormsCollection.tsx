import React, { useContext } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import SelectPropertyForm from './SelectPropertyForm';

const FormsCollection = () => {
  const rootStore = useContext(RootStoreContext);
  const { step } = rootStore.reservationStore;

  switch (step) {
    case 1:
      return <SelectPropertyForm />;
  }
};

export default FormsCollection;
