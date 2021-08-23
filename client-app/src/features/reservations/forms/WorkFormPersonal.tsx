import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, Form, Grid, Radio, Segment } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';

const WorkFormPersonal = () => {
  return (
    <Segment>
      <h2>Employment Status</h2>
      <h3>Personal Information</h3>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox float="right" label="Locally Employed" />
            </Form.Group>
            <Form.Group grouped>
              <Radio label="Private" name="radioGroup" value="this" />{' '}
              <Radio label="Government" name="radioGroup" value="that" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="OFW" />
            </Form.Group>
            <Form.Group grouped>
              <Radio label="Sea Based" name="radioGroup" value="this" />{' '}
              <Radio label="Land Based" name="radioGroup" value="that" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Self-Employed" />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Column width={16}>
          <Form.Group>
            <Field
              width={6}
              label="Company Name"
              name="spouseLastName"
              placeholder="Last Name"
              component={TextInput}
            />
            <Field
              width={10}
              label="Location of Work"
              name="spouseLastName"
              placeholder="Last Name"
              component={TextInput}
            />
          </Form.Group>
          <Form.Group>
            <Field
              width={6}
              label="Industry/Type of Work"
              name="spouseLastName"
              placeholder="Last Name"
              component={TextInput}
            />
            <Field
              width={6}
              label="Date Employed"
              name="spouseLastName"
              placeholder="Last Name"
              component={TextInput}
            />
            <Field
              width={6}
              label="Profession"
              name="spouseLastName"
              placeholder="Last Name"
              component={TextInput}
            />
          </Form.Group>
        </Grid.Column>

        <label>
          <strong>Position/Level:</strong>
        </label>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Rank and File/Staff/Clerk" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Supervisor/Team Lead" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Manager/Director" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Executive Officer" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="Professional (Doctor, Lawyer, Engineer, etc.)" />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              <Checkbox label="FOR BUSINESS OWNERS: (Please Check if applicable)" />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Segment>
  );
};

export default WorkFormPersonal;
