import { TestBed } from '@angular/core/testing';

import { FetchGitIssuesService } from './fetch-git-issues.service';

describe('FetchGitIssuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchGitIssuesService = TestBed.get(FetchGitIssuesService);
    expect(service).toBeTruthy();
  });
});
