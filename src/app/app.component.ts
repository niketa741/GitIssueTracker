import { AppError, NotFoundError } from './common';
import { FetchGitIssuesService } from './services/fetch-git-issues.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  issues;
  result = [{
    total: null,
    last24: null,
    last7: null,
    morethan7: null
  }];
  dataSource = this.result;
  displayedColumns: string[] = [
    'total', 
    'last24', 
    'last7', 
    'morethan7'
  ];
  form = new FormGroup({
    repolink: new FormControl('', Validators.required)
  });

  constructor(private gitService: FetchGitIssuesService, private datePipe: DatePipe){}

  submit(){
    console.log(this.form.get('repolink').value);
    this.validateLink(this.form.get('repolink').value);
  }

  validateLink(repolink: string){
    let arr = repolink.split('/');
    let username = arr[0];
    let repository = arr[1]

    if(!username || !repository){
      console.log("Error in link");
    }else{
      this.RefreshResult();
      this.fetchTotalIssue(username,repository);
      this.fetchIssueDetails(username,repository,this.fetchDate("LAST24"));
      this.fetchIssueDetails(username,repository,this.fetchDate("LAST7"));

    }
  }

  fetchDate(date : string){
    var curr_date = new Date(Date.now());
    switch(date) {
      case "LAST24": 
      return new Date( curr_date.getTime() - (1 * 24 * 60 * 60 * 1000) ).toISOString().slice(0,19)+"Z";
      
      case "LAST7" : 
      return new Date( curr_date.getTime() - (7 * 24 * 60 * 60 * 1000) ).toISOString().slice(0,19)+"Z";
    }

  }

  fetchTotalIssue(username,repository){
    this.gitService.fetchTotalIssues(username,repository)
    .subscribe(
      issues => {
        this.result[0].total = issues.total_count;
        console.log(this.result);
      },
      (error: Response) => {
        if((error instanceof AppError) || (error instanceof NotFoundError)){
          console.log(error);
        }else throw error;
      }
    )
  }
  fetchIssueDetails(username,repository,date) {
    this.gitService.fetchIssuesByDate(username,repository,date)
    .subscribe(
      result => {
        let diff = this.diffFromCurrent(date);
        switch(true) {
        case (diff <=1) : this.result[0].last24 = result.total_count;
        console.log(this.result);
        break;
        case (diff <= 7) : this.result[0].last7 = result.total_count;
        // this.result[0].morethan7 = this.result[0].total - this.result[0].last7;
        console.log(this.result);
        }
      },
      (error: Response) => {
        if((error instanceof AppError) || (error instanceof NotFoundError)){
          console.log(error);
        }else throw error;
      }
    )
  }

  diffFromCurrent(date){
    let prev_date = Date.parse(date);
    let current_date = Date.parse(new Date(Date.now()).toUTCString());
    let differenceInDates = current_date - prev_date;
    //converting the diff in milliseconds to days
    return Math.floor(differenceInDates/(1000*60*60*24));
  }

  RefreshResult(){
    this.result[0].total=0;
    this.result[0].last7=0;
    this.result[0].morethan7=0;
    this.result[0].last24=0;
    console.log("refreshed");
  }


}