import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IProject } from './project';

@Injectable()
export class ProjectService {
    private _projectUrl = 'http://localhost:8080';

    constructor(private _http: Http) { }

    getProjects(): Observable<IProject[]> {
        return this._http.get(this._projectUrl+"/projects")
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
