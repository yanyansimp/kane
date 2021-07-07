import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Segment, Form, Button, Image } from 'semantic-ui-react';
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput';
import SelectInput from '../../app/common/form/SelectInput';
import { category } from '../../app/common/options/categoryOptions';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
  lastName: isRequired('Last Name'),
});

interface DetailParams {
  id: string;
}

const RegistrationForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loading, submitting, loadRoles, roleRegistry } = rootStore.userStore;

  useEffect(() => {
    loadRoles()
  }, [loadRoles]);

  const handleFinalFormSubmit = (values: any) => {

  };

  return (
    <Grid>
      <Grid.Column width={9}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Form.Group widths="equal">
                  <Image
                    circular
                    centered
                    size="small"
                    src="/assets/user.png"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Field
                    width={8}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    name="middleName"
                    label="Middle Name"
                    placeholder="Middle Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="suffix"
                    label="Suffix"
                    placeholder="Suffix"
                    component={TextInput}
                  />
                </Form.Group>
                <Field
                  name="email"
                  label="Email"
                  placeholder="Email"
                  component={TextInput}
                />
                <Field
                  date={true}
                  name="birthDate"
                  label="Birth Date"
                  placeholder="MM/DD/YYYY"
                  component={DateInput}
                />
                <Field
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="Suffix"
                  component={TextInput}
                />
                <Field
                  name="address"
                  label="Address"
                  placeholder="Address"
                  component={TextInput}
                />
                <Field
                  name="title"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  component={TextInput}
                />
                <Field
                  name="role"
                  label="Role"
                  placeholder="Role"
                  options={roleRegistry}
                  component={SelectInput}
                />

                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(RegistrationForm);
