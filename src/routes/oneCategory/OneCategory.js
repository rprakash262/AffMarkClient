import React, { Component } from 'react';
import { connect } from 'react-redux';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ACTIONS } from '../../reducers/OneCategoryReducer';
import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import './OneCategory.css';
import OneItem from '../../components/oneItem';
import ItemsSlider from '../../components/itemsSlider';

class OneCategory extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: ''
    }
  }

  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
    
    const { catObj } = this.props;
    const categoryName = catObj[id];

    this.setState({ categoryName })
  }

  componentWillReceiveProps (nextProps) {
    console.log({nextProps});
    if (nextProps && nextProps.catObj) {
      const query = this.props.location.search;
      const id = query.slice(query.indexOf('=') + 1);

      const { catObj } = this.props;
      console.log({catObj})
      const categoryName = nextProps.catObj[id];
      console.log({ categoryName })
      this.setState({ categoryName })
    }
  }

  redirectHandler = id => {
    window.location.href = `/category/subCategory?id=${id}`;
  }

  render() {
    const {
      oneCategoryContent,
      loadingData,
      loggedIn,
      editItem,
      deleteItem,
    } = this.props;

    const { categoryName } = this.state;

    return (
      <div>
        {loadingData && (
          <div>
            <div className="home-page-item-panel">
              <div className="home-page-item-panel-header">
                <h4><HourglassBottomIcon /></h4>
                <button><HourglassBottomIcon /></button>
              </div>
              <div className="home-page-item-panel-content">
                <HourglassBottomIcon />
              </div>
            </div>
          </div>
        )}
        <h3 style={{ textAlign: 'left', textTransform: 'capitalize' }}>{categoryName}</h3>
        {Object.entries(oneCategoryContent).map(([key, val]) => (
          <div className="home-page-item-panel">
            <div className="home-page-item-panel-header">
              <h4>{key}</h4>
              <button onClick={() => this.redirectHandler(val[0].subCategoryId)}>
                See All
              </button>
            </div>
            <div className="home-page-item-panel-content">
              <ItemsSlider
                items={val}
                loggedIn={loggedIn}
                editItem={editItem}
                deleteItem={deleteItem}
                oneItem={(item) => <OneItem item={item} />}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => {
  const {
    oneCategoryContent,
    loadingData,
    loggedIn,
  } = state.oneCategory;

  const { catObj } = state.layout;

  return {
    oneCategoryContent,
    loadingData,
    loggedIn,
    catObj,
  }
};

const mapDispatch = {
  init: ACTIONS.init,
  editItem: addNewItemActions.editItem,
  deleteItem: addNewItemActions.deleteItem,
};

export default connect(mapState, mapDispatch)(OneCategory);
