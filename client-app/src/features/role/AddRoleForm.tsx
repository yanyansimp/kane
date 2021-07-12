import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Segment, Form, Button, Image, Checkbox } from 'semantic-ui-react';
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput';
import SelectInput from '../../app/common/form/SelectInput';
import { category } from '../../app/common/options/categoryOptions';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
  // role: isRequired('Role'),
});

interface DetailParams {
  id: string;
}

const AddRoleForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { loading, submitting, loadRoles, roleRegistry } = rootStore.userStore;

    useEffect(() => {
      loadRoles();
    }, [loadRoles]);

    const handleFinalFormSubmit = (values: any) => {};
    
  return (
    <Grid>
      <Grid.Column width={5}>
        <h2>Add new role</h2>
        <Segment clearing>
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="role"
                  label="Role Name"
                  placeholder="Role Name"
                  component={TextInput}
                />
                <Form.Group>
                  <Checkbox label="Calendar" />
                </Form.Group>
                <Form.Group>
                  <Checkbox label="Reservation" />
                </Form.Group>
                <Form.Group>
                  <Checkbox label="Payment" />
                </Form.Group>
                <Form.Group>
                  <Checkbox label="Property" />
                </Form.Group>
                <Form.Group>
                  <Checkbox label="User" />
                </Form.Group>
                <Form.Group>
                  <Checkbox label="Report" />
                </Form.Group>
                <Button
                  loading={submitting}
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
};

export default observer(AddRoleForm);
