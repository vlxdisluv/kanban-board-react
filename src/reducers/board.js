import { combineReducers } from 'redux'
import * as types from '../constants';

const initialState = {
  allIds: [],
  byIds: {}
}

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      return [...state, action.payload.listId];
    default:
      return state;
  }
};

const byIds = (state = initialState.byIds, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      return {
        ...state,
        [action.payload.listId]: {
          _id: action.payload.listId,
          nameList: action.payload.name,
          cards: [],
        }
      };
    case types.ADD_CARD:
      return {
        ...state,
        [action.payload.listId]: {
          ...state[action.payload.listId],
          cards: [
            ...state[action.payload.listId].cards,
            { 
              cardId: action.payload.cardId, 
              cardName: action.payload.cardName
            }
          ],
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byIds
});
