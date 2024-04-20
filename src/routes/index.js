import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import '../App.css';  
import { ACTIONS } from '../reducers/LayoutReducer';
import HomePage from './homePage';
import OneProduct from './oneProduct';
import OneCategory from './oneCategory';
import OneSubcategory from './oneSubcategory';
import Admin from './admin';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
// import Footer from '../components/footer';
import AlertBar from '../components/alertBar';
import EditItemModal from '../components/editItemModal';
import ConfirmDeleteItemPrompt from '../components/confirmDeleteItemPrompt';
import SearchResult from '../components/searchResult';
import Scrollable from '../components/scrollable';
import ItemsSlider from '../components/itemsSlider';

class App extends Component {
  constructor() {
    super();
    this.state = {
      left: '-300px',
      display: 'none'
    }
  }

  componentDidMount() {
    this.props.init();
  }

  openSidebar = () => {
    this.setState({
      left: 0,
      display: 'block'
    })
  }

  closeSidebar = () => {
    this.setState({
      left: '-300px',
      display: 'none'
    })
  }

  render() {
    const {
      showAlert,
      alertType,
      alertMsg,
      hideAlert,
      editItemModal,
      hideEditItemModal,
      confirmDeleteItemPrompt,
      hideConfirmDeleteItemPrompt,
      changeSearchText,
      startSearch,
      loggedIn,
      innerWidth,
      innerHeight,
    } = this.props;

    const { left, display } = this.state;

    return (
      <div className="layout">
        <div className="layout-top">
          <div className="burger-nav" onClick={this.openSidebar}>
            <MenuIcon style={{ color: '#fff' }} />
          </div>
          <Banner
            changeSearchText={changeSearchText}
            startSearch={startSearch}
            loggedIn={loggedIn}
          />
          <Navbar
            left={left}
            display={display}
            closeSidebar={this.closeSidebar}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </div>
        <div className="layout-bottom">
          <Scrollable>
            <div className="container">
              <BrowserRouter>
                <Route
                  exact
                  path="/"
                  component={HomePage}
                />
                <Switch>
                  <Route
                    // exact
                    path="/category"  
                    component={OneCategory}
                  />
                </Switch>
                <Switch>
                  <Route
                    // exact
                    path="/category/subCategory"  
                    component={OneSubcategory}
                  />
                </Switch>
                <Switch>
                  <Route
                    // exact
                    path="/category/subCategory/product"  
                    component={OneProduct}
                  />
                </Switch>
                <Switch>
                  <Route
                    // exact
                    path="/search"  
                    component={SearchResult}
                  />
                </Switch>
                <Switch>
                  <Route
                    // exact
                    path="/admin"  
                    component={Admin}
                  />
                </Switch>
              </BrowserRouter>
            </div>
          </Scrollable>
        </div>
        {/* <Footer /> */}
        {editItemModal && (
          <EditItemModal hideEditItemModal={hideEditItemModal} />
        )}
        {confirmDeleteItemPrompt && (
          <ConfirmDeleteItemPrompt
            hideConfirmDeleteItemPrompt = {hideConfirmDeleteItemPrompt}
            // deleteItem={deleteItem}
          />
        )}
        <AlertBar
          showAlert={showAlert}
          alertType={alertType}
          alertMsg={alertMsg}
          hideAlert={hideAlert}
        />
      </div>
    );
  }
}

const mapState = state => {
  const {
    showAlert,
    alertType,
    alertMsg,
    editItemModal,
    confirmDeleteItemPrompt,
    loggedIn,
    innerWidth,
    innerHeight,
  } = state.layout;

  return {
    showAlert,
    alertType,
    alertMsg,
    editItemModal,
    confirmDeleteItemPrompt,
    loggedIn,
    innerWidth,
    innerHeight,
  }
}

const mapDispatch = {
  hideAlert: ACTIONS.hideAlert,
  init: ACTIONS.init,
  hideEditItemModal: ACTIONS.hideEditItemModal,
  hideConfirmDeleteItemPrompt: ACTIONS.hideConfirmDeleteItemPrompt,
  changeSearchText: ACTIONS.changeSearchText,
  startSearch: ACTIONS.startSearch,
};

export default connect(mapState, mapDispatch)(App);