import { TestBed, inject } from '@angular/core/testing';

import { UserListService } from './user-list.service';
import { MockBackend } from '@angular/http/testing';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
describe('UserListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserListService,{provide: Http, deps: [MockBackend]}]
    });
  });

  it('should be created', inject([UserListService], (service: UserListService) => {
    expect(service).toBeTruthy();
  }));
});
