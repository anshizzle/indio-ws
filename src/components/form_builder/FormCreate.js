import React, { Component } from 'react';
import FormInputs from './FormInputs.js';
import './FormCreate.css';

class FormCreate extends Component {
  constructor (props) {
    super(props);
    this.handleSubItemAddition = this.handleSubItemAddition.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleItemDeletion = this.handleItemDeletion.bind(this);
    this.handleItemAddition = this.handleItemAddition.bind(this);
  }

  handleInputChange (itemPath, attributeName, eventOrValue) {
    let value = eventOrValue.constructor === String ? eventOrValue : eventOrValue.target.value
    this.props.onInputChange(itemPath, attributeName, value);
  }

  handleItemDeletion (itemPath) {
    this.props.deleteItem(itemPath);
  }

  handleSubItemAddition (itemPath) {
    this.props.addSubItem(itemPath);
  }

  handleItemAddition () {
    this.props.addItem();
  }

  render () {
    return (
      <div className="form-create">
        <FormInputs
          items={this.props.form}
          onInputChange={this.handleInputChange}
          addSubItem={this.handleSubItemAddition}
          deleteItem={this.handleItemDeletion}
          />
        <button onClick={this.handleItemAddition}> Add Item </button>
      </div>
    )
  }

}

export default FormCreate;
