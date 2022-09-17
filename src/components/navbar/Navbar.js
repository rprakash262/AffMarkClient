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
      showingItemId: ''
    }
  }

  redirectHandler = id => {
    window.location.href = `/category?id=${id}`;
  }

  redirectHandler2 = id => {
    window.location.href = `/category/subCategory?id=${id}`;
  }

  slideDown = id => {
    const { idd } = this.state;

    this.setState({ showingItemId: idd ? '' : id });
  }

  render() {
    const {
      navbar,
      left,
      display,
      closeSidebar,
      innerWidth,
      innerHeight,
    } = this.props;

    console.log({navbar})

    const { showingItemId } = this.state;

    return (
      <React.Fragment>
        {innerWidth > 600 && (
          <div className="navbar">
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
          </div>
        )}
        {innerWidth <= 600 && (
          <React.Fragment>
            <div className="navbar-overlay" style={{ display }} onClick={closeSidebar} />
            <div className="navbar-container-mobile" style={{ left }}>
              <div className="close-navbar-btn" onClick={closeSidebar}>
                <ArrowBackIosIcon style={{ color: '#fff' }} />
              </div>
              {Object.entries(navbar).map(([key, val]) => (
                <div className="one-nav-item-mobile">
                  <div
                    className="one-nav-item-name-mobile"
                    onClick={() => this.slideDown(val[0].categoryId)}
                  >
                    {key.toUpperCase()} <ArrowDropDownIcon style={{ fontSize: '20px' }} />
                  </div>
                  <div
                    className="one-nav-item-dropdown-mobile"
                    style={{
                      height: showingItemId === val[0].categoryId ? 'auto' : 0,
                      overflow: showingItemId === val[0].categoryId ? 'unset' : 'hidden'
                    }}
                  >
                    {val.map(v => 
                      <div onClick={() => this.redirectHandler2(v.id)}>{v.subCategoryName}</div>
                    )}
                    <div onClick={() => this.redirectHandler(val[0].categoryId)}>See All</div>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
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
