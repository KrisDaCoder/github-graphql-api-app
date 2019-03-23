import { Component, OnInit, Input } from '@angular/core';
import { Issue } from 'src/app/models/Issue';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { AppState } from '../../reducers';
import { ViewIssue } from 'src/app/actions/app.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  @Input() issue: Issue;
  repoName = 'Angular';

  constructor(private router: Router,
              private communicationService: CommunicationService,
              private store: Store<AppState>) { }

  ngOnInit() {
  }

  onClick() {
    this.communicationService.setCurrentIssue(this.issue);
    this.store.dispatch(new ViewIssue(this.issue))
    this.router.navigate(['/viewIssue']);
  }

}
