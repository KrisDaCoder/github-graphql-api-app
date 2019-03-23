import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { IssueComponent } from './components/issue/issue.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { UiSwitchModule } from 'ngx-ui-switch';

import { environment } from '../environments/environment';
import { IssuePageComponent } from './components/issue-page/issue-page.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    IssueComponent,
    IssuePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    UiSwitchModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
    ) {
      const http = httpLink.create({uri: environment.GITHUB_GRAPHQL_URI});
      const auth = setContext((_, { headers }) => {
        const token = environment.GITHUB_BEARER_TOKEN;
        if (!token) {
          return {};
        } else {
          return {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
        }
      });
      apollo.create({
        link: auth.concat(http),
        cache: new InMemoryCache()
      });
  }
}
