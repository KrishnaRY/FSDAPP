import { Component,OnInit,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './project.service';
import { IProject } from './project';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserDialogComponent} from '../shared/user-dialog.component';
@Component({
  
    moduleId: module.id,
    templateUrl: 'project.component.html',
    styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit,OnChanges{
    dialogResult = "";
    pageTitle:string='Add Project';
    model: any = {};
    loading = false;
    showDate: boolean = true;
    addproject: boolean = true;
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projects;
    }
    filteredProjects: IProject[];
    projects: IProject[] = [];
    constructor(public dialog: MatDialog,
        private router: Router,
        private projectService: ProjectService) { }

        ngOnInit(): void {
            this.refreshData();
        }
        ngOnChanges():void{
            this.refreshData();
               
           }

        performFilter(filterBy: string): IProject[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.projects.filter((_project: IProject) =>
            _project.project.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }

        toggleCheckBox(): void {
        this.showDate=!this.showDate;
    }

    addProject(_project) {
           
        if(_project.project_ID){

      this.projectService.updateProject(_project) .subscribe(response => {
        this.model=[];  
        this.addproject = true;  
        this.pageTitle='Add Project' ;   
        },
            error => this.errorMessage = <any>error);

        }else{
          alert(_project.priority)
            _project.priority=0;
            alert(_project.priority)
       this.projectService.addProject(_project) .subscribe(response => {
       
       },
            error => this.errorMessage = <any>error);    
            this.refreshData();
            this.model=[];  
    }

    }



    refreshData(){
        this.projectService.getProjects()
        .subscribe(projects => {
            this.projects = projects;
            this.filteredProjects=projects;
           
        },
            error => this.errorMessage = <any>error);
     }


     openUserModal() {
        let dialogRef = this.dialog.open(UserDialogComponent, {
          width: '600px',
          data: 'This text is passed into the dialog'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
          this.dialogResult = result;
        })
      }
   
}


