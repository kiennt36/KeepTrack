import {
	DELETE_PROJECT_FAILURE,
	DELETE_PROJECT_REQUEST,
	DELETE_PROJECT_SUCCESS,
	LOAD_PROJECTS_FAILURE,
	LOAD_PROJECTS_REQUEST,
	LOAD_PROJECTS_SUCCESS,
	ProjectActionTypes,
	ProjectState,
	SAVE_PROJECT_FAILURE,
	SAVE_PROJECT_REQUEST,
	SAVE_PROJECT_SUCCESS,
} from "./projectTypes";
import { Project } from "../projects/Project";

export const initialProjectState: ProjectState = {
	projects: [],
	loading: false,
	error: null,
	page: 1,
};

export function projectReducer(
	state = initialProjectState,
	action: ProjectActionTypes
) {
	switch (action.type) {
		case LOAD_PROJECTS_REQUEST:
			return { ...state, loading: true, error: null };

		case LOAD_PROJECTS_SUCCESS:
			let projects: Project[];

			const { page } = action.payload;

			if (page === 1) {
				projects = action.payload.projects;
			} else {
				projects = state.projects.concat(action.payload.projects);
			}
			return { ...state, page, projects, loading: false, error: null };

		case LOAD_PROJECTS_FAILURE:
			return { ...state, loading: false, error: action.payload.message };

		case SAVE_PROJECT_REQUEST:
			return { ...state };

		case SAVE_PROJECT_SUCCESS:
			if (action.payload.isNew) {
				return {
					...state,
					projects: state.projects.concat(action.payload),
				};
			} else {
				return {
					...state,
					projects: state.projects.map((project: Project) => {
						if (project.id === action.payload.id) {
							return action.payload;
						}
						return project;
					}),
				};
			}

		case SAVE_PROJECT_FAILURE:
			return { ...state, error: action.payload.message };

		case DELETE_PROJECT_REQUEST:
			return { ...state };

		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				projects: state.projects.filter(
					(project: Project) => project.id !== action.payload.id
				),
			};

		case DELETE_PROJECT_FAILURE:
			return { ...state, error: action.payload.message };

		default:
			return state;
	}
}
