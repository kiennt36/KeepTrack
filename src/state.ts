import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { ProjectState } from "./state/projectTypes";
import { initialProjectState, projectReducer } from "./state/projectReducer";

const reducer = combineReducers({
	projectState: projectReducer,
});

export default function configureStore(preloadedState: any) {
	const middlewares: any[] = [thunk];
	const middlewareEnchancer = applyMiddleware(...middlewares);

	const enhancer = composeWithDevTools(middlewareEnchancer);
	const store = createStore(reducer, preloadedState, enhancer);
	return store;
}

export interface AppState {
	projectState: ProjectState;
}

export const initialAppState: AppState = {
	projectState: initialProjectState,
};

export const store = configureStore(initialAppState);
