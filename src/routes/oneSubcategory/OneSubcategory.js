import React, { Component } from 'react';
import { connect } from 'react-redux';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ACTIONS } from '../../reducers/OneSubCategoryReducer';
import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import './OneSubcategory.css';
import OneItem from '../../components/oneItem';
import ItemsSlider from '../../components/itemsSlider';

class OneSubcategory extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: '',
      subCategoryName: '',
    }
  }

  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  redirectHandler = productId => {
    window.location.href = `/category/subCategory/product?id=${productId}`;
  }

  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  componentWillReceiveProps(nextProps) {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    if (nextProps && nextProps.catObj && nextProps.subCatObj) {  
      const { catObj, subCatObj, subCategories } = this.props;
      const subCategoryName = subCatObj[id];
      let categoryName = '';

      subCategories.forEach(e => {
        if (e.id === id) {
          const catId = e.categoryId;
          categoryName = catObj[catId];
        }
      })
      console.log({ subCategoryName, categoryName });
      this.setState({ subCategoryName, categoryName })
    }
  }

  render() {
    const {
      oneSubCategoryContent,
      loadingData,
      loggedIn,
      editItem,
      deleteItem,
      catObj,
      subCatObj,
      subCategories
    } = this.props;

    const {
      categoryName,
      subCategoryName
    } = this.state;

    // console.log({props: this.props, oneSubCategoryContent, catObj, subCatObj, subCategories });

    return (
      <div className="one-subcategory">
        {loadingData && (
          <div>
            <HourglassBottomIcon />
          </div>
        )}
        <h3>{ categoryName } > { subCategoryName }</h3>
        <div className="home-page-item-panel-content">
          <div className="one-subcategory-grid">
            {oneSubCategoryContent.map((item) => (
              <div className="one-subcategory-grid-item">
                <OneItem
                  item={item}
                  loggedIn={loggedIn}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
              </div>
            ))}
          </div>
        </div>
        {/*<div className="home-page-item-panel-content">
          <ItemsSlider
            items={oneSubCategoryContent}
            loggedIn={loggedIn}
            editItem={editItem}
            deleteItem={deleteItem}
            oneItem={(item) => <OneItem item={item} />}
          />
        </div>*/}
      </div>
    );
  }
}

const mapState = state => {
  const {
    oneSubCategoryContent,
    loadingData,
    loggedIn
  } = state.oneSubCategory;

  const {
    catObj,
    subCatObj,
    subCategories,
  } = state.layout;

  return {
    oneSubCategoryContent,
    loadingData,
    loggedIn,
    catObj,
    subCatObj,
    subCategories,
  }
};

const mapDispatch = {
  init: ACTIONS.init,
  editItem: addNewItemActions.editItem,
  deleteItem: addNewItemActions.deleteItem,
}

export default connect(mapState, mapDispatch)(OneSubcategory);
