import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError, AppError } from '../common';

@Injectable({
  providedIn: 'root'
})
export class FetchGitIssuesService {

  private url;
  constructor(private http: HttpClient) { }

  fetchTotalIssues(username,repo_name){
    this.url = `https://api.github.com/search/issues?q=repo:${username}/${repo_name}+type:issue+state:open`;
    return this.http.get(this.url)
    .pipe(catchError(this.handleError));
  }
  fetchIssuesByDate(username,repo_name,date) {
    this.url = `https://api.github.com/search/issues?q=repo:${username}/${repo_name}+type:issue+state:open++created:<${date}`;
    return this.http.get(this.url)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: Response){
    if(error instanceof NotFoundError)
      return throwError(new NotFoundError());
    else if(error instanceof AppError)
      return throwError(new AppError());
  }

}