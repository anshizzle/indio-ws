import React, { Component } from 'react';
import FormInput from './FormInput.js';

class FormInputs extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange       = this.handleInputChange.bind(this);
    this.handleSubItemAddition = this.handleSubItemAddition.bind(this);
    this.handleItemDeletion = this.handleItemDeletion.bind(this);
  }

  handleInputChange(itemPath, attributeName, value) {
    this.props.onInputChange(itemPath, attributeName, value);
  }

  handleSubItemAddition(itemPath) {
    this.props.addSubItem(itemPath);
  }

  handleItemDeletion(itemPath) {
    this.props.deleteItem(itemPath);
  }

  render() {
    const items = this.props.items;
    const listInputs = items.map((input, index) =>
      <FormInput
        key={input.id}
        item={input}
        path={[index]}
        addSubItem={this.handleSubItemAddition}
        onInputChange={this.handleInputChange}
        deleteItem={this.props.deleteItem}
      />
    );

    return (<ul>{listInputs}</ul>);
  }
}

export default FormInputs;
