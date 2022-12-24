import React, { Component } from 'react';
import { connect } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { ACTIONS } from '../../reducers/OneProductReducer';
import './OneProduct.css';
import OneItem from '../../components/oneItem';
import ItemsSlider from '../../components/itemsSlider';

const style = { fontSize: '20px', color: '#ed143d' };

class OneProduct extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  render() {
    const {
      oneProduct,
      loadingData,
      selectImg,
      selectedImg,
      similarProducts,
    } = this.props;

    return (
      <div className="one-product">
        {loadingData && (
          <div>Fetching data. Please wait..</div>
        )}
        {!loadingData && (
          <React.Fragment>
            <div className="one-product-content">
              <div className="one-product-imgs">
                <div className="one-product-preview-img">
                  {oneProduct && oneProduct.itemImage && oneProduct.itemImage.length > 0 && oneProduct.itemImage.map(img => (
                    <img onClick={() => selectImg(img)} alt="item_img" src={img} />
                  ))}
                </div>
                <div className="one-product-showing-img">
                  <img alt="item_img" src={selectedImg} />
                </div>
              </div>
              <div className="one-product-main">
                <h4>{oneProduct.itemName}</h4>
                <div>
                {
                  Array(5).fill().map((x, i) => {
                    if (oneProduct.customerRating > i - 1 && oneProduct.customerRating < i + 1) {
                      return <StarHalfIcon style={style} />
                    } else if (oneProduct.customerRating < i + 1) {
                      return <StarOutlineIcon style={style} />
                    } else if (oneProduct.customerRating > i + 1) {
                      return <StarIcon style={style} />
                    }
                  })
                }
                </div>
                <h3>Rs. {oneProduct.itemPrice} /-</h3>
                <p>{oneProduct.itemDescription}</p>
                <button>
                  <a href={oneProduct.buyLink} target="_blank" rel="noreferrer">Buy on {oneProduct.platform || `Flipkart`}</a>
                </button>
              </div>
            </div>
            <div className="one-product-similar-products">
              <h5>Similar Products</h5>
              <ItemsSlider
                items={similarProducts}
                loggedIn={false}
                editItem={() => {}}
                deleteItem={() => {}}
                oneItem={(item) => <OneItem item={item} />}
              />
              {/*{similarProducts.map((item) => (
                  <OneItem
                    item={item}
                    loggedIn={false}
                    editItem={() => {}}
                    deleteItem={() => {}}
                  />
                ))
              }*/}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const {
    oneProduct,
    loadingData,
    selectedImg,
    similarProducts,
  } = state.oneProduct;

  return {
    oneProduct,
    loadingData,
    selectedImg,
    similarProducts,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
  selectImg: ACTIONS.selectImg,
}

export default connect(mapState, mapDispatch)(OneProduct);
