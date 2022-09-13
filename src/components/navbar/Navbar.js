import React, { Component } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Navbar.css';

class Navbar extends Component {
  constructor () {
    super();
    this.state = {
      left: 0,
    }
  }

  redirectHandler = id => {
    window.location.href = `/category?id=${id}`;
  }

  redirectHandler2 = id => {
    window.location.href = `/category/subCategory?id=${id}`;
  }

  closeSidebar = () => {
    this.props.closeSidebar();
  }

  openSidebar = () => {
    this.setState({ left: 0 })
  }

  render() {
    const { navbar, left, closeSidebar } = this.props;

    return (
      <div className="navbar" style={{ left }}>
        <div className="navbar-container">
          {Object.entries(navbar).map(([key, val]) => (
            <div className="one-nav-item">
              <div className="one-nav-item-name">
                {key.toUpperCase()} <ArrowDropDownIcon style={{ fontSize: '20px' }} />
              </div>
              <div className="one-nav-item-dropdown">
                {val.map(v => 
                  <div onClick={() => this.redirectHandler2(v.id)}>{v.subCategoryName}</div>
                )}
                <div onClick={() => this.redirectHandler(val[0].categoryId)}>See All</div>
              </div>
            </div>
          ))}
        </div>
        <div className="navbar-container-mobile">
          <div className="close-navbar-btn" onClick={this.closeSidebar}>
            <ArrowBackIosIcon style={{ color: '#fff' }} />
          </div>
          {Object.entries(navbar).map(([key, val]) => (
            <div className="one-nav-item">
              <div className="one-nav-item-name">
                {key.toUpperCase()} <ArrowDropDownIcon style={{ fontSize: '20px' }} />
              </div>
              <div className="one-nav-item-dropdown">
                {val.map(v => 
                  <div onClick={() => this.redirectHandler2(v.id)}>{v.subCategoryName}</div>
                )}
                <div onClick={() => this.redirectHandler(val[0].categoryId)}>See All</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { navbar } = state.layout;

  return {
    navbar,
  }
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Navbar);
