import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IUser } from './user';

@Injectable()
export class UserService {
    private _userUrl = 'http://localhost:8080';

    constructor(private _http: Http) { }

    getUsers(): Observable<IUser[]> {
        return this._http.get(this._userUrl+"/users")
            .map(this.extractData)
            .catch(this.handleError);
    }
 
    deleteUser(user_ID:number): Observable<Response> {
    
     var _userUrl1=this._userUrl+"/delete/"+user_ID;
    
             return this._http.delete(_userUrl1)
             .catch(this.handleError);
    }
 addUser(user): Observable<Response> {

          let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this._http.post(this._userUrl +"/addUser", user, options)
           .map(success => success.status)
           .catch(this.handleError);
    
    
    }
     updateUser(user): Observable<Response> {

          let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this._http.post(this._userUrl +"/updateUser", user, options)
           .map(success => success.status)
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
