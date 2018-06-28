import {createStore, combineReducers} from "redux";
import {userReducer} from "./reducers";

const reducer = combineReducers({
	user: userReducer
});

const initialState = {
	user: {
		authenticated: false
	}
};

const store = createStore(reducer, initialState);
export default store;
