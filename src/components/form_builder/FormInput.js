import React, { Component } from 'react';
import SubItemInputs from './SubItemInputs.js';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubItemAddition = this.handleSubItemAddition.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleItemDeletion = this.handleItemDeletion.bind(this);
  }

  handleInputChange (itemPath, attributeName, eventOrValue) {
    let value = eventOrValue.constructor === String ? eventOrValue : eventOrValue.target.value
    this.props.onInputChange(itemPath, attributeName, value);
  }

  handleItemDeletion (itemPath) {
    this.props.deleteItem(itemPath);
  }

  handleSubItemAddition(itemPath) {
    this.props.addSubItem(itemPath);
  }

  render () {
    const item = this.props.item;
    return (
      <li className="form-item">
        <div className="form-input-item">
          <div className="line-input">
            <div className="label"> Question </div>
            <input
              type="text"
              value={item.question}
              onChange={this.handleInputChange.bind(this, this.props.path, 'question')}
            />
          </div>

          <div className="line-input">
            <div className="label"> Type </div>
            <select
              onChange={this.handleInputChange.bind(this,this.props.path, 'type')}
              value={item.type}>
              <option value="boolean"> Yes/No </option>
              <option value="text">   Text   </option>
              <option value="number"> Number </option>
            </select>
          </div>

          <div className="flex-reverse">
            <a
              href='#'
              className='right gray-btn' onClick={this.handleSubItemAddition.bind(this, this.props.path)}>
              Add Sub-Item
            </a>

            <a
              href='#'
              className='right gray-btn'
              onClick={this.handleItemDeletion.bind(this, this.props.path)}>
              Delete
            </a>
          </div>
        </div>
        {item.subItems.length > 0 &&
            <SubItemInputs
              items={item.subItems}
              path={this.props.path}
              parentType={item.type}
              onInputChange={this.handleInputChange}
              addSubItem={this.handleSubItemAddition}
              deleteItem={this.handleItemDeletion}/>
        }
      </li>
    )
  }
}

export default FormInput;
