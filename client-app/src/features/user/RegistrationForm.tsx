import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Segment, Form, Button, Image } from 'semantic-ui-react';
import DateInput from '../../app/common/form/DateInput';
import TextInput from '../../app/common/form/TextInput';
import SelectInput from '../../app/common/form/SelectInput';
import { category } from '../../app/common/options/categoryOptions';
import { RootStoreContext } from '../../app/stores/rootStore';
import { UserFormValues } from '../../app/models/user';

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
  const { submitting, loadRoles, roleRegistry, role, register } = rootStore.userStore;

  const [user, setUser] = useState(new UserFormValues());
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
    }
    loadRoles()
  }, [loadRoles]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...user } = values;

    if(!user.id) {
      let newUser = {
        ...user
      };
      register(newUser);
    } else {
      // Update User
    }
  };
  return (
    <Grid>
      <Grid.Column width={9}>
        <h2>Add new user</h2>
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
                    value={user.lastName}
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    value={user.firstName}
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    name="middleName"
                    label="Middle Name"
                    placeholder="Middle Name"
                    value={user.middleName}
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    name="suffix"
                    label="Suffix"
                    placeholder="Suffix"
                    value={user.suffix}
                    component={TextInput}
                  />
                </Form.Group>
                <Field
                  name="email"
                  label="Email"
                  placeholder="Email"
                  value={user.email}
                  component={TextInput}
                />
                <Field
                  date={true}
                  name="birthDate"
                  label="Birth Date"
                  placeholder="MM/DD/YYYY"
                  value={user.birthDate}
                  component={DateInput}
                />
                <Field
                  name="phoneNumber"
                  label="Contact Number"
                  placeholder="Contact Number"
                  value={user.phoneNumber}
                  component={TextInput}
                />
                <Field
                  name="address"
                  label="Address"
                  placeholder="Address"
                  value={user.address}
                  component={TextInput}
                />
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  component={TextInput}
                />
                <Field
                  name="role"
                  label="Role"
                  placeholder="Role"
                  value={user.role}
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
                  as={Link}
                  floated="right"
                  type="button"
                  content="Cancel"
                  to={'/user'}
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
