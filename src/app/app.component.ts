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
    // console.log(this.form.get('repolink').value);
    this.validateLink(this.form.get('repolink').value);
  }

  validateLink(repolink: string){
    let arr = repolink.split('/');
    let username = arr[0];
    let repository = arr[1]
    if(!username || !repository){
      console.log("Error in link");
    }else{
      this.fetchIssueDetails(username,repository);
    }
    // console.log(`Username - ${username}, repository - ${repository}`);
  }

  fetchIssueDetails(username,repo_name){
    this.gitService.fetchissue(username,repo_name)
    .subscribe(
      issues => {
        this.issues = issues;
        this.daysPassedBy(this.issues);
        console.log("Values Calculated");
      },
      (error: Response) => {
        if((error instanceof AppError) || (error instanceof NotFoundError)){
          console.log(error);
        }else throw error;
      }
    )
  }

  daysPassedBy(issues: any[]){
    this.RefreshResult();
    this.result[0].total = issues.length;
    issues.forEach(issue => {
      let diff = this.diffFromCurrent(issue.created_at);
      // console.log("diff - "+diff+" days");
      // console.log("created at -"+issue.created_at);
      switch(true){
        case (diff<1): this.result[0].last24++;
        break;
        case (diff<7): this.result[0].last7++;
        break;
        case (diff>7): this.result[0].morethan7++;
        break;
        default: console.log("Wrong calculation");
      }
    });
    // console.log(JSON.stringify(this.result));
  }

  diffFromCurrent(date){
    let prev_date = Date.parse(date);
    let current_date = Date.parse(new Date(Date.now()).toUTCString());
    let differenceInDates = current_date - prev_date;
    //converting the diff in milliseconds to days
    return differenceInDates/(1000*60*60*24);
  }

  RefreshResult(){
    this.result[0].total=null;
    this.result[0].last7=null;
    this.result[0].morethan7=null;
    this.result[0].last24=null;
    console.log("refreshed");
  }


}
