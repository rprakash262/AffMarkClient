import { mainActions, adminActions } from '../actions';

const { fetchNavbar } = mainActions;
const { getCategories, getSubCategories } = adminActions;

const SET_ALERT = 'LayoutReducer/SET_ALERT';
const HIDE_ALERT = 'LayoutReducer/HIDE_ALERT';
const SET_NAVBAR = 'LayoutReducer/SET_NAVBAR';
const TOGGLE_EDIT_ITEM_MODAL = 'LayoutReducer/TOGGLE_EDIT_ITEM_MODAL';
const TOGGLE_CONFIRM_DELETE_ITEM_PROPMT = 'LayoutReducer/TOGGLE_CONFIRM_DELETE_ITEM_PROPMT';
const CHANGE_SEARCH_TEXT = 'LayoutReducer/CHANGE_SEARCH_TEXT';
const CHANGE_SEARCH_FLAG = 'LayoutReducer/CHANGE_SEARCH_FLAG';
const SET_CAT_OBJ = 'LayoutReducer/SET_CAT_OBJ';
const SET_SUB_CAT_OBJ = 'LayoutReducer/SET_SUB_CAT_OBJ';
const SET_LOGGED_IN = 'LayoutReducer/SET_LOGGED_IN';
const SET_DIMENSIONS = 'LayoutReducer/SET_DIMENSIONS';

const setNavbar = navbar => ({ type: SET_NAVBAR, navbar });
const toggleEditItemModal = bool => ({ type: TOGGLE_EDIT_ITEM_MODAL, bool });
const toggleConfirmDeleteItemPrompt = bool => ({ type: TOGGLE_CONFIRM_DELETE_ITEM_PROPMT, bool });
const changeSearchText = val => ({ type: CHANGE_SEARCH_TEXT, val });
const setCatObj = obj => ({ type: SET_CAT_OBJ, obj });
const setSubCatObj = obj => ({ type: SET_SUB_CAT_OBJ, obj });
const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setDimensions = (width, height) => ({ type: SET_DIMENSIONS, width, height });

const defaultState = {
  editItemModal: false,
  confirmDeleteItemPrompt: false,
  showAlert: false,
  alertType: '',
  alertMsg: '',
  navbar: {},
  searchText: '',
  searchFlag: false,
  catObj: {},
  subCatObj: {},
  loggedIn: false,
  innerWidth: 0,
  innerHeight: 0,
};

const init = () => async dispatch => {
  try {
    const loggedIn = await localStorage.getItem('loggedIn');

    if (loggedIn) {
      dispatch(setLoggedIn(true));
    }

    const response = await fetchNavbar();
    const categories = await getCategories();
    const subCategories = await getSubCategories();

    const { result } = response;

    const catObj = {};
    const subCatObj = {};

    categories.map(cat => {
      catObj[cat.id] = cat.categoryName;
    })

    subCategories.map(subCat => {
      subCatObj[subCat.id] = subCat.subCategoryName;
    });


    dispatch(setNavbar(result));
    dispatch(setCatObj(catObj));
    dispatch(setSubCatObj(subCatObj));
    dispatch(setDimensions(window.innerWidth, window.innerHeight));
  } catch (err) {
    console.log(err);
  }
}

const startSearch = (e) => async (dispatch, getState) => {
  const { searchText } = getState().layout;


  if (e.charCode == 13) {
    localStorage.setItem('query', searchText);
    window.location.href = `/search?q=${searchText}`;
  }
}

export const ACTIONS = {
  init,
  hideAlert: () => ({ type: HIDE_ALERT }),
  setAlert: (bool, alertType, alertMsg) => ({ type: SET_ALERT, bool, alertType, alertMsg }),
  showEditItemModal: () => toggleEditItemModal(true),
  hideEditItemModal: () => toggleEditItemModal(false),
  showConfirmDeleteItemPrompt: () => toggleConfirmDeleteItemPrompt(true),
  hideConfirmDeleteItemPrompt: () => toggleConfirmDeleteItemPrompt(false),
  changeSearchText,
  startSearch,
};

function LayoutReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALERT:
      return Object.assign({}, state, {
        showAlert: action.bool,
        alertType: action.alertType,
        alertMsg: action.alertMsg,
      });
    case HIDE_ALERT:
      return Object.assign({}, state, {
        showAlert: false
      });
    case SET_NAVBAR:
      return Object.assign({}, state, {
        navbar: action.navbar
      });
    case TOGGLE_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        editItemModal: action.bool
    });
    case TOGGLE_CONFIRM_DELETE_ITEM_PROPMT:
      return Object.assign({}, state, {
        confirmDeleteItemPrompt: action.bool
      });
    case CHANGE_SEARCH_TEXT:
      return Object.assign({}, state, {
        searchText: action.val
      });
    case SET_CAT_OBJ:
      return Object.assign({}, state, {
        catObj: action.obj
      });
    case SET_SUB_CAT_OBJ:
      return Object.assign({}, state, {
        subCatObj: action.obj
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    case SET_DIMENSIONS:
      return Object.assign({}, state, {
        innerWidth: action.width,
        innerHeight: action.height,
      });
    default:
      return state;
  }
}

export default LayoutReducer;