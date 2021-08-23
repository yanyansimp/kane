import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Image, Modal, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { TransactionTypeFormValues } from '../../../app/models/transactionType';
import { v4 as uuid } from 'uuid';
const validate = combineValidators({
  name: isRequired('Transaction Type'),
  });
  
 
function ModalTransactionTypeModal() {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { submitting, createTransactionType } = rootStore.transactionTypeStore;
    const [transactionType, setUser] = useState(new TransactionTypeFormValues());
    const handleFinalFormSubmit = (values: any) => {
      const { ...transactionType } = values;
      let newTransaction = {
        id: uuid(),
        ...transactionType 
      }
      createTransactionType(newTransaction);
      setOpen(false)
    };

  return (
    <Modal
        size='tiny'
        onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="Change"   color='yellow'  >Add Transaction</Button>}
    >
      <Modal.Header>Transaction Type</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
         <Grid>
             <Grid.Column>
             <FinalForm
                 validate={validate}
                 onSubmit={handleFinalFormSubmit}
                 render={({ handleSubmit,invalid,pristine}) => (
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Group>
                        <Field
                                width={8}
                                name="name"
                                label="Transaction Type"
                                placeholder="Transaction Type"
                                value={transactionType.name}
                                component={TextInput}
                            />
                        </Form.Group>
                            <Button
                            loading={submitting}
                            disabled={loading || invalid || pristine}
                            floated="right"
                            content="Submit"
                            type="submit"
                            positive
                            />
                    </Form>
                 )}
             />
             </Grid.Column>
         </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalTransactionTypeModal