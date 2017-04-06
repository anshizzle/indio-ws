import React, { Component } from 'react';
import SubItemInputs from './SubItemInputs.js';

class SubItemInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubItemAddition = this.handleSubItemAddition.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemDeletion = this.handleItemDeletion.bind(this);
  }

  /*
   * Initialize the values of the subitem conditional values if they have not been set yet
   */
  componentWillMount() {
    const parentType = this.props.parentType;
    const item = this.props.item;
    if (parentType === 'boolean' ||
          parentType === 'text' ||
          !item.condition_type) {
      this.handleInputChange(this.props.path, 'condition_type', 'equals');
    }

    if (parentType === 'boolean' &&
          (item.condition_value !== 'true' ||
            item.condition_value !== 'false')) {
      this.handleInputChange(this.props.path, 'condition_value', 'true');
    }
  }

  handleInputChange(itemPath, attributeName, eventOrValue) {
    let value = eventOrValue.constructor === String ? eventOrValue : eventOrValue.target.value
    this.props.onInputChange(itemPath, attributeName, value);
  }

  handleItemDeletion(itemPath) {
    this.props.deleteItem(itemPath);
  }

  handleSubItemAddition(itemPath) {
    this.props.addSubItem(itemPath);
  }

  /**
   * returns the type select dropdown with the appropriate options for the subitem given
   * its parent type.
   */
  subItemTypeSelect () {
    const item = this.props.item;
    if (this.props.parentType === 'boolean' || this.props.parentType === 'text') {
      return (
        <select
          onChange={this.handleInputChange.bind(this, this.props.path, 'condition_type')}
          value={this.props.item.condition_type} >
          <option value='equals'>Equals</option>
        </select>
      );
    } else {
      return (
        <select
          onChange={this.handleInputChange.bind(this, this.props.path, 'condition_type')}
          value={this.props.item.condition_type}>
          <option value='equals'>Equals</option>
          <option value='greater_than'>Greater Than</option>
          <option value='less_than'>Less Than</option>
        </select>
      );
    }
  }
  /**
   * returns the appropriate value input for the subitem given its parent type.
   */
  subItemValueSelect() {
    const item = this.props.item;

    if (this.props.parentType === 'text') {
      return (
        <input
          type='text'
          value={item.condition_value}
          onChange={this.handleInputChange.bind(this, this.props.path, 'condition_value')} />
      );
    } else if (this.props.parentType === 'number') {
      return (
        <input
          type='number'
          value={item.condition_value}
          onChange={this.handleInputChange.bind(this, this.props.path, 'condition_value')} />
      );
    } else {
      return (
        <select
          onChange={this.handleInputChange.bind(this, this.props.path, 'condition_value')}
          value={item.condition_value}>
          <option
            value='true'>
            Yes
          </option>
          <option
            value='false'>
            No
          </option>
        </select>
      );

    }
  }

  render () {
    const item = this.props.item;
    const subItemConditionType = this.subItemTypeSelect();
    const subItemConditionValue = this.subItemValueSelect();
    return (
      <li className='sub-form-item'>
        <div className='form-input-item'>
          <div className='line-input'>
            <div className='label'> Condition </div>

            {subItemConditionType}
            {subItemConditionValue}
          </div>

          <div className='line-input'>
            <div className='label'> Question </div>
            <input
              type='text'
              value={item.question}
              onChange={this.handleInputChange.bind(this, this.props.path, 'question')}
            />
          </div>


          <div className='line-input'>
            <div className='label'> Type </div>
            <select
              onChange={this.handleInputChange.bind(this, this.props.path, 'type')}
              value={item.type}>
              <option value='boolean'> Yes/No </option>
              <option value='text'>   Text   </option>
              <option value='number'> Number </option>
            </select>
          </div>

          <div className='flex-reverse'>
            <a href='#' className='gray-btn' onClick={this.handleSubItemAddition.bind(this, this.props.path)}>
              Add Sub-Item
            </a>

            <a href='#' className='gray-btn' onClick={this.handleItemDeletion.bind(this, this.props.path)}>
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
              deleteItem={this.handleItemDeletion} />
        }
      </li>
    )
  }
}

export default SubItemInput;
