import { Action } from '@ngrx/store';
import { Issue } from '../models/Issue';


export enum AppActionTypes {
  SearchIssues = '[SearchIssues] Action',
  ViewIssue = '[ViewIssue] Action',
  SetState = '[SetState] Action',
  SetPreviousText = '[SetPreviousText] Action'
}

export class SearchIssues implements Action {
  readonly type = AppActionTypes.SearchIssues;
  private payload: Issue[];
  constructor(payload: Issue[]) {
    this.payload = payload;
  }
}

export class ViewIssue implements Action {
  readonly type = AppActionTypes.ViewIssue;
  private payload: Issue;
  constructor(payload: Issue) {
    this.payload = payload;
  }
}

export class SetState implements Action {
  readonly type = AppActionTypes.SetState;
  private payload: boolean;
  constructor(payload: boolean) {
    this.payload = payload;
  }
}

export class SetPreviousText implements Action {
  readonly type = AppActionTypes.SetPreviousText;
  private payload: string;
  constructor(payload: string) {
    this.payload = payload;
  }
}

export type AppActions = [SearchIssues, ViewIssue, SetState, SetPreviousText];
