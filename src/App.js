import React, { Component } from 'react';
import logo from './logo.svg';
import FormCreate from './components/form_builder/FormCreate.js';
import Export from './components/Export.js'
import FormPreview from './components/form_preview/FormPreview.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './App.css';

/**
 Form is an array of inputs

 Input : { type: "", question: "", subinputs: [] }

 SubInput: { type: "", question: "", condition_type: "", condition_value: "", subinputs: [] }
*/

class App extends Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.addSubItem = this.addSubItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.inputChanged    = this.inputChanged.bind(this);
    this.getItemFromPath = this.getItemFromPath.bind(this);

    this.state = {
      form: JSON.parse(localStorage.getItem('indio-form') || '[]')
    };

  }

  /*
   * Saves the state to localstorage if the app updates
   */
  componentWillUpdate (nextProps, nextState) {
    localStorage.setItem('indio-form', JSON.stringify(this.state.form));
  }

  /**
   * Adds an item to the form
   */
  addItem () {
    this.setState((prevState, props) => {
      form: prevState.form.push({
        id: prevState.form.length,
        type: 'boolean',
        question: '',
        subItems: []
      })
    });
  }

  /**
   * Deletes an item from the form given the path
   *
   * @param {Array} path array of indices leading to the item to be deleted
   */
  deleteItem (path) {
    this.setState(function (prevState, props) {

      if (path.length === 1) {
        prevState.form.splice(path[0], 1);
      }
      else {
        const itemToRemove = path.pop();
        const item = this.getItemFromPath(prevState.form, path);

        item.subItems.splice(itemToRemove, 1);
      }

      return { form: prevState.form };
    });
  }

  /**
   * Adds a subitem to an item given by its path
   *
   * @param {Array} path array of indices leading to the item to be given a subitem
   */
  addSubItem (path) {
    this.setState(function (prevState, props) {
      const item = this.getItemFromPath(prevState.form, path);

      item.subItems.push({
        id: path.concat(item.subItems.length).toString(),
        type: 'boolean',
        question: '',
        condition_type: '',
        condition_value: '',
        subItems: []
      });

      return { form: prevState.form };
    });
  }

  /**
   * @param {Array} path array of indices indicating location of item.
   */
  getItemFromPath (form, path) {
    if (path.length === 0) { return form; }
    form = form[path[0]];
    for (let i = 1; i < path.length; i++) {
      form = form.subItems[path[i]];
    }

    return form;
  }

  /**
   * Updates the state when an item has been updated from the form builder
   *
   */
  inputChanged (path, attribute, value) {
    this.setState((prevState, props) => {
      const item = this.getItemFromPath(prevState.form, path);

      item[attribute] = value;
      return { form: prevState.form };
    });
  }

  render () {
    return (
      <div className="wrapper">
        <h1> Form Builder </h1>
      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>Create</Tab>
          <Tab>Preview</Tab>
          <Tab>Export</Tab>
        </TabList>

        <TabPanel>
          <FormCreate
            form={this.state.form}
            onInputChange={this.inputChanged}
            addSubItem={this.addSubItem}
            deleteItem={this.deleteItem}
            addItem={this.addItem}
            />
        </TabPanel>

        <TabPanel>
          <FormPreview form={this.state.form} />
        </TabPanel>

        <TabPanel>
          <Export form={this.state.form} />
        </TabPanel>
      </Tabs>
      </div>
    );
  }
}

export default App;
