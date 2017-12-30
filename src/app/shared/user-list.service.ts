import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { IUserList } from './user-list';

@Injectable()
export class UserListService {
    private _userUrl = environment.apiEndpoint;

    constructor(private _http: Http) { }

    getUsers(): Observable<IUserList[]> {
        return this._http.get(this._userUrl+"/users")
            .map(this.extractData)
            .catch(this.handleError);
    }
 
    private handleError(error: Response | any) {
       return Observable.throw(error.status);
    }
     private extractData(res: Response) {
	let body = res.json();
        return body;
    }
}
