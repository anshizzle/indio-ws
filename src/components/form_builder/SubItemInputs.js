import React, { Component } from 'react';
import SubItemInput from './SubItemInput.js';

class SubItemInputs extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange     = this.handleInputChange.bind(this);
    this.handleSubItemAddition = this.handleSubItemAddition.bind(this);
    this.handleItemDeletion    = this.handleItemDeletion.bind(this);
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
      <SubItemInput
        key={input.id}
        item={input}
        parentType={this.props.parentType}
        path={this.props.path.concat(index)}
        addSubItem={this.handleSubItemAddition}
        deleteItem={this.handleItemDeletion}
        onInputChange={this.handleInputChange}
      />
    );

    return (<ul>{listInputs}</ul>);
  }
}

export default SubItemInputs;
