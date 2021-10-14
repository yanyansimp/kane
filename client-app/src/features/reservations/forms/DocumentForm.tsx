import React from 'react'
import { Field } from 'react-final-form';
import { Divider, Form, Segment } from 'semantic-ui-react';
import CheckBoxInput from '../../../app/common/form/CheckBoxInput';

const DocumentForm = () => {
    return (
      <Segment>
        <h2>Documents</h2>
        <Divider clearing />
        <Form.Group>
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="post dated cheque"
            label="Post Dated Cheque"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="marriage cert - birth cert"
            label="Photocopy of Marriage Certificate/Birth Certificate"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="2pcs 2x2 picture"
            label="2 pcs 2x2 picture"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="community tax certificate"
            label="Community Tax Certificate"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="proof of billing"
            label="Proof of Billing"
          />
        </Form.Group>
        <Form.Group>
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="2 valid id"
            label="2 Valid ID's (Company and Government)"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="tin"
            label="Tax Identification Number"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="house sketch"
            label="House Sketch"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="3 pcs 1x1 picture"
            label="3 pcs 1x1 picture"
          />
          <Field
            name="documents"
            component={CheckBoxInput}
            type="checkbox"
            value="spa"
            label="SPA (with Consular Seal if notarized abroad)"
          />
        </Form.Group>
      </Segment>
    );
}

export default DocumentForm
