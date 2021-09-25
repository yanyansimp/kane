import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import { Button, Checkbox, Form, Grid, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { gender } from '../../../app/common/options/genderOptions';
import { ClientFormValues } from '../../../app/models/client';
import RadioInput from '../../../app/common/form/RadioInput';
import { observer } from 'mobx-react-lite';


interface DetailParams {
    id: string;
}

const EditClientForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadClient, editClient, submitting } = rootStore.reservationStore;

  const [client, setClient] = useState(new ClientFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadClient(match.params.id)
        .then((client) => setClient(new ClientFormValues(client)))
        .finally(() => setLoading(false));
    }
  }, [loadClient, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    // console.log(values)
    editClient(values);
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <h2>Edit Client</h2>
      </Grid.Column>

      <Grid.Column width={16}>
        <FinalForm
          initialValues={client}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              {/* Start Personal Info  */}
              <Segment>
                <h2>Personal Information</h2>
                <Form.Group>
                  <Field
                    width={8}
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Middle Name"
                    name="middleName"
                    placeholder="Middle Name"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    label="Suffix"
                    name="suffix"
                    placeholder="Suffix"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    date="true"
                    label="Date of Birth"
                    name="birthDate"
                    placeholder="MM/DD/YYYY"
                    component={DateInput}
                  />
                  <Field
                    width={8}
                    label="Gender"
                    name="gender"
                    placeholder="Gender"
                    options={gender}
                    component={SelectInput}
                  />
                  <Field
                    width={8}
                    label="Civil Status"
                    name="civilStatus"
                    placeholder="Civil Status"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    label="Religion"
                    name="religion"
                    placeholder="Religion"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="TIN"
                    name="tin"
                    placeholder="TIN"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Contact Number"
                    name="contactNumber"
                    placeholder="Contact Number"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Zip Code"
                    name="zipCode"
                    placeholder="Zip Code"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={16}
                    label="Address"
                    name="address"
                    placeholder="Address"
                    component={TextInput}
                  />
                </Form.Group>
                <h2>Spouse' Information</h2>
                <Form.Group>
                  <Checkbox label="Spouse Information (Please check if applicable)" />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    label="Last Name"
                    name="spouseLastName"
                    placeholder="Last Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="First Name"
                    name="spouseFirstName"
                    placeholder="First Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Middle Name"
                    name="spouseMiddleName"
                    placeholder="Middle Name"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    date="true"
                    label="Date of Birth"
                    name="spouseBirthDate"
                    placeholder="MM/DD/YYYY"
                    component={DateInput}
                  />
                  <Field
                    width={8}
                    label="Gender"
                    name="spouseGender"
                    placeholder="Gender"
                    options={gender}
                    component={SelectInput}
                  />
                  <Field
                    width={8}
                    label="TIN"
                    name="spouseTin"
                    placeholder="TIN"
                    component={TextInput}
                  />
                </Form.Group>
              </Segment>
              {/* End Personal Info  */}

              {/* Start Co-borrower & Atty */}
              <Segment>
                <h2>Co-Borrower's Information</h2>
                <Form.Group>
                  <Field
                    width={8}
                    label="Last Name"
                    name="coLastName"
                    placeholder="Last Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="First Name"
                    name="coFirstName"
                    placeholder="First Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Middle Name"
                    name="coMiddleName"
                    placeholder="Middle Name"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    label="Suffix"
                    name="coSuffix"
                    placeholder="Suffix"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    date="true"
                    label="Date of Birth"
                    name="coBirthDate"
                    placeholder="MM/DD/YYYY"
                    component={DateInput}
                  />
                  <Field
                    width={8}
                    label="Gender"
                    name="coGender"
                    placeholder="Gender"
                    options={gender}
                    component={SelectInput}
                  />
                  <Field
                    width={8}
                    label="TIN"
                    name="coTin"
                    placeholder="TIN"
                    component={TextInput}
                  />
                </Form.Group>
                <h2>Attorney In-Fact's Information</h2>
                <Form.Group>
                  <Field
                    width={8}
                    label="Last Name"
                    name="atLastName"
                    placeholder="Last Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="First Name"
                    name="atFirstName"
                    placeholder="First Name"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    label="Middle Name"
                    name="atMiddleName"
                    placeholder="Middle Name"
                    component={TextInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    width={8}
                    label="Suffix"
                    name="atSuffix"
                    placeholder="Suffix"
                    component={TextInput}
                  />
                  <Field
                    width={8}
                    date="true"
                    label="Date of Birth"
                    name="atBirthDate"
                    placeholder="MM/DD/YYYY"
                    component={DateInput}
                  />
                  <Field
                    width={8}
                    label="Gender"
                    name="atGender"
                    placeholder="Gender"
                    options={gender}
                    component={SelectInput}
                  />
                  <Field
                    width={8}
                    label="TIN"
                    name="atTin"
                    placeholder="TIN"
                    component={TextInput}
                  />
                </Form.Group>
              </Segment>
              {/* End Co-borrower & Atty */}

              {/* Start Work Personal */}
              <Segment>
                <Segment clearing>
                  <h2>Employment Status</h2>
                </Segment>
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

              {/* End Work Personal */}

              {/*  */}

              <Button
                loading={submitting}
                disabled={loading || invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                onClick={() => history.push(`/clients/${match.params.id}`)}
                disabled={loading}
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EditClientForm);
