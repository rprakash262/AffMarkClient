import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/AdminReducer';
import { ACTIONS as layoutActions } from '../../reducers/LayoutReducer';
import AddNewItem from '../../components/addNewItem';
import Scrollable from '../../components/scrollable';
import './EditItemModal.css';

function EditItemModal({
  hideEditItemModal,
  loadingEditItemModal,
}) {
  return (
    <div>
        {loadingEditItemModal && (
          <div className="edit-item-modal">Loading...Please wait</div>
        )}
        {!loadingEditItemModal && (
          <div className="edit-item-modal">
            <Scrollable>
              <div
                className="close-edit-item-modal"
                onClick={hideEditItemModal}
              >
                <HighlightOffIcon style={{ fontSize: '35px', color: '#ed143d' }} />
              </div>
              <div className="edit-item-modal-content">
                <AddNewItem />
              </div>
            </Scrollable>
          </div>
        )}
    </div>
  );
}

const mapState = state => {
  const { loadingEditItemModal } = state.addNewItem;

  return {
    loadingEditItemModal,
  }
}

const mapDispatch = {
  hideEditItemModal: layoutActions.hideEditItemModal,
}

export default connect(mapState, mapDispatch)(EditItemModal);
