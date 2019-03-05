import { FetchGitIssuesService } from './services/fetch-git-issues.service';
import { AppErrorHandler } from './common/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [
    FetchGitIssuesService,
    DatePipe,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
