import React from 'react'
import { Checkbox, Form, Grid, Radio, Segment } from 'semantic-ui-react';

const WorkFormPersonal = () => {
    return (
      <Segment>
        <h2>Employment Status</h2>
        <h3>Personal Information</h3>
        <Grid.Column verticalAlign="middle">
          <Form.Group widths="equal">
            <Checkbox label="Locally Employed" />
          </Form.Group>
        </Grid.Column>
        <Grid.Column>
          <Form.Group widths="equal">
            <Checkbox label="Locally Employed" />
            <Checkbox label="Self-Employed" />
            <Checkbox label="OFW" />
          </Form.Group>
        </Grid.Column>
        {/* <Checkbox float="right" label="Locally Employed" />
        <Form.Group grouped>
          <Radio label="Private" name="radioGroup" value="this" />
          <Radio label="Government" name="radioGroup" value="that" />
        </Form.Group>
        <Checkbox float="right" label="Locally Employed" />
        <Form.Group grouped>
          <Radio label="Private" name="radioGroup" value="this" />
          <Radio label="Government" name="radioGroup" value="that" />
        </Form.Group> */}
      </Segment>
    );
}

export default WorkFormPersonal
