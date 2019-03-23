import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/Issue';
import { CommunicationService } from 'src/app/services/communication.service';
import { AppState } from '../../reducers';
import { ViewIssue } from 'src/app/actions/app.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.css']
})
export class IssuePageComponent implements OnInit {

  issue: Issue;
  repoName = 'Angular';

  constructor(private communicationService: CommunicationService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.communicationService.currentIssue.subscribe(data => {
      if (data) {
        this.issue = data;
      } else {
        this.store.subscribe((data: any) => {
          this.issue = data.appState.currentIssue;
        });
      }
    });
  }

}
