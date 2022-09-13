import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import AddNewCategory from './AddNewCategoryForm';
import AddNewSubCategory from './AddNewSubCategoryForm';
import AddNewItemForm from './AddNewItemForm';
import { ACTIONS } from '../../reducers/AdminReducer';
import { ACTIONS as addNewCategoryActions } from '../../reducers/AddNewCategoryReducer';
import { ACTIONS as addNewSubCategoryActions } from '../../reducers/AddNewSubCategoryReducer';
import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import './Admin.css';

class Admin extends Component {
  async componentDidMount() {
    await this.props.init();
    this.props.addNewCategoryInit();
    this.props.addNewSubCategoryInit();
    this.props.addNewItemInit();
  }

  render() {
    const {
      selectedTab,
      setSelectedTab,
      changeSecurityKey,
      submitSecurityKey,
      loggedIn,
      submitttingFlag,
      allCategories
    } = this.props;

    return (
      <div>
        {!loggedIn && (
          <div className="admin">
            <div className="admin-add-new-category">
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter security key"
                  onChange={e => changeSecurityKey(e.target.value)}
                />
              </div>
              <div className="admin-one-form-item">
                <button onClick={submitSecurityKey}>Enter</button>
              </div>
            </div>
          </div>
        )}
        {loggedIn && (
          <div className="admin">
            <div className="admin-sidenav">
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewCategory')}
              >
                Add New Category
                {selectedTab === 'addNewCategory' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewSubCategory')}
              >
                Add New Sub-Category
                {selectedTab === 'addNewSubCategory' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewItem')}
              >
                Add New Item
                {selectedTab === 'addNewItem' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
            </div>
            <div className="admin-main-area">
              {selectedTab === 'addNewCategory' && <AddNewCategory allCategories={allCategories} /> }
              {selectedTab === 'addNewSubCategory' && <AddNewSubCategory /> }
              {selectedTab === 'addNewItem' && <AddNewItemForm /> }
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  const {
    selectedTab,
    loggedIn,
    submitttingFlag,
    allCategories
  } = state.admin;

  return {
    selectedTab,
    loggedIn,
    submitttingFlag,
    allCategories
  };
}

const mapDispatch = {
  init: ACTIONS.init,
  setSelectedTab: ACTIONS.setSelectedTab,
  changeSecurityKey: ACTIONS.changeSecurityKey,
  submitSecurityKey: ACTIONS.submitSecurityKey,
  addNewCategoryInit: addNewCategoryActions.init,
  addNewSubCategoryInit: addNewSubCategoryActions.init,
  addNewItemInit: addNewItemActions.init,
}

export default connect(mapState, mapDispatch)(Admin);