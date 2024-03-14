import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import {
	ProjectState,
	LOAD_PROJECTS_FAILURE,
	LOAD_PROJECTS_REQUEST,
	LOAD_PROJECTS_SUCCESS,
	SAVE_PROJECT_FAILURE,
	SAVE_PROJECT_REQUEST,
	SAVE_PROJECT_SUCCESS,
} from "./projectTypes";
import { Project } from "../projects/Project";
import { projectAPI } from "../projects/projectAPI";

// action creators
export function loadProjects(
	page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: any) => {
		dispatch({ type: LOAD_PROJECTS_REQUEST });
		return projectAPI
			.get(page)
			.then((data: any) => {
				dispatch({
					type: LOAD_PROJECTS_SUCCESS,
					payload: { projects: data, page },
				});
			})
			.catch((error: any) => {
				dispatch({
					type: LOAD_PROJECTS_FAILURE,
					payload: { message: error.message },
				});
			});
	};
}

export function saveProject(
	project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: any) => {
		dispatch({ type: SAVE_PROJECT_REQUEST });
		return projectAPI
			.put(project)
			.then((data: any) => {
				dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
			})
			.catch((error: any) => {
				dispatch({
					type: SAVE_PROJECT_FAILURE,
					payload: { message: error.message },
				});
			});
	};
}
