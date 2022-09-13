import { mainActions } from '../actions';

const { fetchOneProduct } = mainActions;

const SET_CONTENT = 'oneProduct/SET_CONTENT';
const SET_LOADING_DATA  = 'oneProduct/SET_LOADING_DATA ';
const SET_LOGGED_IN  = 'oneProduct/SET_LOGGED_IN ';
const SET_SELECTED_IMG  = 'oneProduct/SET_SELECTED_IMG ';

const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setOneProduct = product => ({ type: SET_CONTENT, product });
const setLoadingData = bool => ({ type: SET_LOADING_DATA, bool });
const selectImg = img => ({ type: SET_SELECTED_IMG, img });

const defaultState = {
  oneProduct: [],
  loadingData: false,
  selectedImg: '',
};

const init = productId => async (dispatch, getState) => {
  dispatch(setLoadingData(true));

  const loggedIn = await localStorage.getItem('loggedIn');

  if (loggedIn) {
    dispatch(setLoggedIn(true));
  }
  
  try {
    const response2 = await fetchOneProduct(productId);

    const { result } = response2;

    dispatch(setOneProduct(result));
    dispatch(selectImg(result.itemImage))
    dispatch(setLoadingData(false));
  } catch (err) {
    console.error(err);
    dispatch(setLoadingData(false));
  }
}

export const ACTIONS = {
  init,
  selectImg,
};

function OneProductReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return Object.assign({}, state, {
        oneProduct: action.product,
      });
    case SET_LOADING_DATA:
      return Object.assign({}, state, {
        loadingData: action.bool,
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    case SET_SELECTED_IMG:
      return Object.assign({}, state, {
        selectedImg: action.img,
      });
    default:
      return state;
  }
}

export default OneProductReducer;