import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const PaymentDeleteConfirm: React.FC<{ id: string }> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);
  const { modal, closeModal } = rootStore.modalStore;

  const { deletePayment, submitting } = rootStore.paymentStore;

  const handleDelete = (id: string) => {
    if (id) {
      deletePayment(id);
      closeModal();
    }
  };

  return (
    <Segment placeholder basic>
      <Header icon>
        <Icon name="payment" />
        Are you sure you want to delete payment?
      </Header>
      <Segment.Inline>
        <Button color="red" inverted onClick={() => closeModal()}>
          <Icon name="remove" /> Cancel
        </Button>

        <Button
          color="green"
          loading={submitting}
          inverted
          onClick={() => handleDelete(id)}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default observer(PaymentDeleteConfirm);
