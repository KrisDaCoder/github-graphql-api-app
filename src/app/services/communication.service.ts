import { Injectable } from '@angular/core';
import { Issue } from '../models/Issue';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private issueSource = new BehaviorSubject<Issue>(null);
  currentIssue = this.issueSource.asObservable();

  constructor() { }

  setCurrentIssue(issue: Issue) {
    this.issueSource.next(issue);
  }

}
