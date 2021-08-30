import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Image, Modal, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
const validate = combineValidators({
    transactionType: isRequired('transaction Type'),
  });
  

function ModalTransactionTypeModal() {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { submitting,} = rootStore.userStore;
    
    const handleFinalFormSubmit = (values: any) => {
    const { ...user } = values;
        setOpen(false)

    };

  return (
    <Modal
        size='tiny'
        onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button color='yellow'  >New Client</Button>}>
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
                                name="transactionType"
                                label="transaction Type"
                                placeholder="transaction Type"
                                // value={user.lastName}
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