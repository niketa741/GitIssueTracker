# GitIssueTrackerApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.
Gitrepoapp is a simple app which tracks opened issues from a given repository. It takes input as
`username/repo_name` and then displays the total count of opened issues, issues opened in the last 24 
hours, issues opened within last 7 days and issues older than a week.

## Development Requirement

- **Angular** environment should be configured in your local machine. For a detailed guide on how to get started with angular, refer [here](https://angular.io/guide/quickstart)

## Installation

    $ git clone https://github.com/anasanshu/issuetracker.git
    $ cd issuetracker
    $ ng serve

Navigate to ``http://localhost:4200/``. The app will automatically reload if you change any of the source files.

## Sample Inputs 

- kubernetes/enhancements
- niketa741/ContactsApi
- ocaml/ocaml

## Deploy to heroku

- To deploy on ``heroku``, run ``npm run deployToHeroku``. Note that, before running this command, your
work changes are already pushed to github. If you had made some changes in the code and want to push
code to github as well as deploy to heroku at the same time, then run - ``npm run deploy:heroku``

Also, you can deploy to heroku only when you had already created heroku app from the console. 
To know more about deploying to heroku, refer [this page](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

You can also view the app live [here](https://gitopenissue.herokuapp.com/)
