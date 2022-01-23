import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import React, { useContext, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';
import {
  Grid,
  Segment,
  Form,
  Button,
  Image,
  Checkbox,
  Table,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react';
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
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loading, submitting, loadRoles, addRole, role, roleClaims, addClaim, roleRegistry } =
    rootStore.userStore;

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...role } = values;

    if (!role.id) {
      let newRole = {
        ...role,
        roleClaims: roleClaims
      };
      addRole(newRole);
    }
   
  };

  return (
    <Grid stackable>
      <Grid.Column width={5}>
        <h2>Add Role</h2>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={role}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="name"
                  label="Role Name"
                  placeholder="Role Name"
                  component={TextInput}
                />
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="Calendar"
                    value={'Calendar'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="Reservation"
                    value={'Reservation'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="Payment"
                    value={'Payment'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="Property"
                    value={'Property'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="User"
                    value={'User'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    name="roleClaim"
                    label="Report"
                    value={'Report'}
                    onChange={(e, data) => addClaim(data.value)}
                  />
                </Form.Field>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  onClick={handleFinalFormSubmit}
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
          {/* <pre>
            <h5>{JSON.stringify(role?.roleClaims, null, 2)}</h5>
          </pre> */}
        </Segment>
      </Grid.Column>

      <Grid.Column width={10}>
        <h2>List of Roles</h2>
        <Segment>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Role Claims</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Administrator</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Label color="green" horizontal>
                    Dashboard
                  </Label>
                </Table.Cell>
              </Table.Row> */}

              {roleRegistry.map((role: any) => (
                <Table.Row key={role.key}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>{role.text}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {role.claims.map((claim: any) => (
                      <Label color="green" horizontal>
                        {claim}
                      </Label>
                    ))}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AddRoleForm);
