import React, { Component } from 'react';
import FormPreviewInput from './FormPreviewInput.js';
import './FormPreview.css';

class FormPreview extends Component {

  render () {
    const formInputs = this.props.form.map((item) =>
      <FormPreviewInput key={item.id} item={item} />)

    return (<ul className='form-preview'>{formInputs}</ul>)
  }

}

export default FormPreview;
