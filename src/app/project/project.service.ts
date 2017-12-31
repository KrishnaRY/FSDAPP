import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IProject } from './project';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {
    private _projectUrl = environment.apiEndpoint;

    constructor(private _http: Http) { }

    getProjects(): Observable<IProject[]> {
        return this._http.get(this._projectUrl+"/projects")
            .map(this.extractData)
            .catch(this.handleError);
    }

    addProject(project): Observable<Response> {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  return this._http.post(this._projectUrl +"/addProject", project, options)
         .map(success => success.status)
         .catch(this.handleError);
  
  
  }
 
    updateProject(project): Observable<Response> {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  return this._http.post(this._projectUrl +"/updateProject", project, options)
         .map(success => success.status)
         .catch(this.handleError);
  
  
  }
  suspendProject(project_ID:number): Observable<Response> {

    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: cpHeaders });
return this._http.put(this._projectUrl +"/suspendProject/"+project_ID, "", options)
     .map(success => success.status)
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
