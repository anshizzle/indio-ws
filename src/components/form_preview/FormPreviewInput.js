import React, { Component } from 'react';

class FormPreviewInput extends Component {

  constructor (props) {
    super(props);

    this.handleInputChange.bind(this);

    this.state = { value: '' };
  }

  handleInputChange (e) {
    this.setState({ value: e.target.value });
  }

  /*
   * Returns the appropriate input element based on the form input type
   */
  inputElement () {
    const type = this.props.item.type;

    switch (this.props.item.type) {
      case 'number':
        return <input
          type='number'
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}/>;
      case 'text':
        return <input
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}/>;
      case 'boolean':
        return (
          <div>
            <input
              type='radio'
              value='true'
              checked={this.state.value === 'true'}
              onChange={this.handleInputChange.bind(this)}/>
            <label>Yes</label>
            <input
              type='radio'
              value='false'
              checked={this.state.value === 'false'}
              onChange={this.handleInputChange.bind(this)}/>
            <label>No</label>
          </div>
        );
    }
  }

  /*
   * Evaluates a sub item conditional on the current value of the form
   */
  evaluateConditional(item) {
    const current_val = this.state.value;
    const condition_type = item.condition_type;
    const condition_value = item.condition_value;

    if (current_val === '') { return false; }

    // If item type is not number, then only conditional is equals
    if (this.props.item.type !== 'number') {
      return current_val === condition_value;
    }
    else {
      switch (condition_type) {
        case 'equals':
          return Number(current_val) === Number(condition_value);
        case 'greater_than':
          return Number(current_val) > Number(condition_value);
        case 'less_than':
          return Number(current_val) < Number(condition_value);
      }
    }
  }

  render () {
    const item = this.props.item;
    const label = <div className='label'>{item.question}</div>;
    const inputEl = this.inputElement();

    let subItems = item.subItems.filter(this.evaluateConditional.bind(this));

    subItems = subItems.map((subItem) => <FormPreviewInput key={subItem.id} item={subItem} />);
    return (
      <li key={item.id} >
        <div className="form-preview-item">
          {label}{inputEl}
        </div>
        <ul>{subItems}</ul>
      </li>
    )
  }

}

export default FormPreviewInput;
