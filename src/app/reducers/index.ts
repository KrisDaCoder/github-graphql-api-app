import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IssueComponent } from '../components/issue/issue.component';
import { Issue } from '../models/Issue';
import { AppActionTypes } from '../actions/app.actions';
import { Action } from '@ngrx/store';

type AllAppState = {
  issues: Issue[];
  currentIssue: Issue;
  previousSearchText: string;
  status: boolean;
};

export interface AppState {
  appState: AllAppState;
}

const initialState: AllAppState = {
  issues: [],
  currentIssue: {
    createdAt: '',
    title: '',
    body: '',
    url: '',
    comments: []
  },
  previousSearchText: '',
  status: true
};

function allAppStateReducer(state: AllAppState = initialState, action): AllAppState {
  switch (action.type) {
    case AppActionTypes.SearchIssues:
      return {
          issues: action.payload,
          currentIssue: state.currentIssue,
          previousSearchText: state.previousSearchText,
          status: state.status
      };

    case AppActionTypes.ViewIssue:
      return {
          issues: state.issues,
          currentIssue: action.payload,
          previousSearchText: state.previousSearchText,
          status: state.status
      };

    case AppActionTypes.SetState:
      return {
          issues: state.issues,
          currentIssue: state.currentIssue,
          previousSearchText: state.previousSearchText,
          status: action.payload
      };

    case AppActionTypes.SetPreviousText:
      return {
          issues: state.issues,
          currentIssue: state.currentIssue,
          previousSearchText: action.payload,
          status: state.status
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  appState: allAppStateReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
