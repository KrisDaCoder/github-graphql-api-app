import { Component, OnInit } from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';
import { Issue } from 'src/app/models/Issue';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { SearchIssues, SetPreviousText, SetState } from 'src/app/actions/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText = '';
  previousSearchText: string;
  issues: Issue[];
  status: string;
  statusBool: boolean;
  queryIssue = gql`
    query IssueQuery($queryString:String!) {
      search(first: 10, type: ISSUE, query: $queryString) {
        issueCount
        edges {
          node {
            ... on Issue {
              createdAt
              title
              body
              url
              comments(first: 10) {
                nodes {
                  body
                }
              }
            }
          }
        }
      }
    }
  `;

  constructor(private apollo: Apollo,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.statusBool = true;
    this.store.subscribe((data: any) => {
      this.issues = data.appState.issues;
      this.previousSearchText = data.appState.previousSearchText;
      this.statusBool = data.appState.status;
      this.status = this.statusBool ? 'open' : 'closed';
    });
  }

  search() {
    let issues: Issue[] = [];
    this.status = this.statusBool ? 'open' : 'closed';
    const queryFull = `repo:angular/angular is:issue state:${this.status.trim()} ${this.searchText.trim()} in:title in:body`;
    this.apollo
      .query<Query>({
        query: this.queryIssue,
        variables: {
          queryString: queryFull
        }
      })
      .subscribe((result: any) => {
        result.data.search.edges.forEach(node => {
          const issue: Issue = {
            createdAt: node.node.createdAt,
            title: node.node.title,
            body: node.node.body,
            url: node.node.url,
            comments: []
          };
          if (node.node.comments.nodes.length > 0) {
            node.node.comments.nodes.forEach(subNode => {
              issue.comments.push(subNode.body);
            });
          }
          issues.push(issue);
        });
        this.store.dispatch(new SearchIssues(issues));
        this.store.dispatch(new SetPreviousText(this.searchText));
        this.searchText = '';
      });
  }

  onChange() {
    this.statusBool = !this.statusBool;
    this.store.dispatch(new SetState(this.statusBool));
  }

}
