import React, { Component } from 'react';

class Export extends Component {

  formWithoutIds () {

  }

  objectJSON () {
    // Get rid of the id keys that we used for react
    return JSON.stringify(this.props.form, function (key, value) {
      if (key === 'id') {
        return undefined;
      } else {
        return value;
      }
    });
  }

  render () {
    const json = this.objectJSON();
    return(
      <textarea readOnly value={json} rows="20" cols="150"/>
    );
  }

}

export default Export;
