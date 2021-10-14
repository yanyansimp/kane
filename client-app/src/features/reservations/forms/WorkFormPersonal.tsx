import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';

const WorkFormPersonal = () => {
  return (
    <Segment>
      <h2>Employment Status</h2>
      <Divider clearing />
      <h3>Personal Information</h3>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox float="right" label="Locally Employed" /> */}
              <Field
                name="employment"
                component={RadioInput}
                type="radio"
                value="Locally Employed"
                label="Locally Employed"
              />
            </Form.Group>
            <Form.Group grouped>
              {/* <Radio label="Private" name="radioGroup" value="this" /> */}
              <Field
                name="employmentType"
                component={RadioInput}
                type="radio"
                value="Private"
                label="Private"
              />{' '}
              {/* <Radio label="Government" name="radioGroup" value="that" /> */}
              <Field
                name="employmentType"
                component={RadioInput}
                type="radio"
                value="Goverment"
                label="Government"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="OFW" /> */}
              <Field
                name="employment"
                component={RadioInput}
                type="radio"
                value="OFW"
                label="OFW"
              />
            </Form.Group>
            <Form.Group grouped>
              {/* <Radio label="Sea Based" name="radioGroup" value="this" /> */}
              <Field
                name="employmentType"
                component={RadioInput}
                type="radio"
                value="Sea Based"
                label="Sea Based"
              />{' '}
              {/* <Radio label="Land Based" name="radioGroup" value="that" /> */}
              <Field
                name="employmentType"
                component={RadioInput}
                type="radio"
                value="Land Based"
                label="Land Based"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="Self-Employed" /> */}
              <Field
                name="employment"
                component={RadioInput}
                type="radio"
                value="Self-Employed"
                label="Self-Employed"
              />
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
              name="companyName"
              placeholder="Company Name"
              component={TextInput}
            />
            <Field
              width={10}
              label="Location of Work"
              name="companyLocation"
              placeholder="Location of Work"
              component={TextInput}
            />
          </Form.Group>
          <Form.Group>
            <Field
              width={6}
              label="Industry/Type of Work"
              name="industry"
              placeholder="Industry"
              component={TextInput}
            />
            <Field
              width={6}
              label="Date Employed"
              name="dateEmployed"
              placeholder="Date Employed"
              component={TextInput}
            />
            <Field
              width={6}
              label="Profession"
              name="profession"
              placeholder="Profession"
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
              {/* <Checkbox label="Rank and File/Staff/Clerk" /> */}
              {/* <Field
                name="position"
                component={CheckBoxInput}
                label="Rank and File/Staff/Clerk"
                type="checkbox"
                value="Rank and File/Staff/Clerk"
              /> */}
              <Field
                name="position"
                component={RadioInput}
                type="radio"
                value="Rank and File/Staff/Clerk"
                label="Rank and File/Staff/Clerk"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="Supervisor/Team Lead" /> */}
              {/* <Field
                name="position"
                component={CheckBoxInput}
                label="Supervisor/Team Lead"
                type="checkbox"
                value="Supervisor/Team Lead"
              /> */}
              <Field
                name="position"
                component={RadioInput}
                type="radio"
                value="Supervisor/Team Lead"
                label="Supervisor/Team Lead"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="Manager/Director" />*/}
              {/* <Field
                name="position"
                component={CheckBoxInput}
                label="Manager/Director"
                type="checkbox"
                value="Manager/Director"
              /> */}
              <Field
                name="position"
                component={RadioInput}
                type="radio"
                value="Manager/Director"
                label="Manager/Director"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="Executive Officer" /> */}
              {/* <Field
                name="position"
                component={CheckBoxInput}
                label="Executive Officer"
                type="checkbox"
                value="Executive Officer"
              /> */}
              <Field
                name="position"
                component={RadioInput}
                type="radio"
                value="Executive Officer"
                label="Executive Officer"
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group grouped widths="equal">
              {/* <Checkbox label="Professional (Doctor, Lawyer, Engineer, etc.)" /> */}
              {/* <Field
                name="position"
                component={CheckBoxInput}
                label="Professional (Doctor, Lawyer, Engineer, etc.)"
                type="checkbox"
                value="Professional (Doctor, Lawyer, Engineer, etc.)"
              /> */}
              <Field
                name="position"
                component={RadioInput}
                type="radio"
                value="Professional (Doctor, Lawyer, Engineer, etc.)"
                label="Professional (Doctor, Lawyer, Engineer, etc.)"
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Group grouped widths="equal">
              <Checkbox label="FOR BUSINESS OWNERS: (Please Check if applicable)" />
            </Form.Group>
          </Grid.Column>
          <Grid.Column width={16}>
            <Form.Group>
              <Field
                width={8}
                label="Business Name"
                name="businessName"
                placeholder="Business Name"
                component={TextInput}
              />
              <Field
                width={8}
                label="Business Location"
                name="businessLocation"
                placeholder="businessLocation"
                component={TextInput}
              />
            </Form.Group>
            <Form.Group>
              <Field
                width={8}
                label="Industry"
                name="businessIndustry"
                placeholder="Industry"
                component={TextInput}
              />
              <Field
                width={8}
                label="Date of Establishment"
                name="dateEstablished"
                placeholder="Date of Establishment"
                component={TextInput}
              />
            </Form.Group>
            <label>
              <strong>Business Type:</strong>
            </label>
            <Form.Group>
              <Field
                name="businessType"
                component={RadioInput}
                type="radio"
                value="Single Proprietorship"
                label="Single Proprietorship"
              />
              <Field
                name="businessType"
                component={RadioInput}
                type="radio"
                value="Partnership"
                label="Partnership"
              />
              <Field
                name="businessType"
                component={RadioInput}
                type="radio"
                value="Corporation"
                label="Corporation"
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default WorkFormPersonal;
