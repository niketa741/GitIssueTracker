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

  fetchissue(username,repo_name){
    this.url = `https://api.github.com/repos/${username}/${repo_name}/issues`;
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