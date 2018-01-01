import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IViewTask } from './view-task';
import { environment } from '../../environments/environment';
@Injectable()
export class ViewTaskService {
    private _tasktUrl = environment.apiEndpoint;

    constructor(private _http: Http) { }

    getViewTasks(): Observable<IViewTask[]> {
        return this._http.get(this._tasktUrl+"/tasks")
            .map(this.extractData)
            .catch(this.handleError);
    }
 
   
    private handleError(error: Response | any) {
       return Observable.throw(error.status);
    }
     private extractData(res: Response) {
    let body = res.json();
    console.log(body);
        return body;
    }
}
