import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  GET_PROJECTS,
  EDIT_PROJECT
} from "./types";
export const addProject = project => ({ type: ADD_PROJECT, project });
export const removeProject = id => ({ type: REMOVE_PROJECT, id });
export const editProject = project => ({
  type: EDIT_PROJECT,

  project
});
export const getProjectsAction = projects => ({ type: GET_PROJECTS, projects });
