import { Component, OnInit, OnChanges, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './project.service';
import { IProject } from './project';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UserDialogComponent } from '../shared/user-dialog.component';
import { IUserList } from '../shared/user-list';
import { Interpolation } from '@angular/compiler';

@Component({

    moduleId: module.id,
    templateUrl: 'project.component.html',
    styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
    dialogResult: MatDialogRef<IUserList[]>;
    dialogValue: any[];
    selectedProecjId: number = 0;
    pageTitle: string = 'Add Project';
    model: any = {};
    loading = false;
    public form: FormGroup;
    showDate: boolean = true;
    public isUserUpdating: boolean = true;
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
        private projectService: ProjectService,
        formBuilder: FormBuilder) {
        this.form = new FormGroup({
            project: new FormControl(null, Validators.required),
            date_start: new FormControl(false),
            start_Date: new FormControl(this.currentDate()),
            end_Date: new FormControl(this.currentDate()),
            priority: new FormControl(0),
            user_ID: new FormControl(null, Validators.required)

        })
    }

    ngOnInit(): void {
        this.refreshData();
    }

    currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 10);
    }
    performFilter(filterBy: string): IProject[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.projects.filter((_project: IProject) =>
            _project.project.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleCheckBox(): void {

        this.showDate = !this.showDate;
    }

    addProject() {
     
        let id = this.selectedProecjId > 0 ? this.selectedProecjId : undefined;
        let project1: IProject = {
            project_ID: id,
            project: this.form.value.project,
            start_Date: this.form.value.start_Date,
            end_Date: this.form.value.end_Date,
            priority: this.form.value.priority,
            user_ID: Number(this.dialogValue),

        };



        if (!!id) {

            this.projectService.updateProject(project1).subscribe(response => {
                this.isUserUpdating = true;
                this.pageTitle = 'Add Project';
                this.refreshData();


            },
                error => this.errorMessage = <any>error);
                this.form.reset();
        } else {

            this.projectService.addProject(project1).subscribe(response => {

            },
                error => this.errorMessage = <any>error);
            this.refreshData();
            this.form.reset();
            this.form.setValue({ start_Date: this.currentDate(), end_Date: this.currentDate(), priority: 0 });

        }

    }
    edit(project1) {         
        this.isUserUpdating = false;
        this.pageTitle='Edit Project' ;
        this.form.setValue({project:project1.project,
            start_Date:project1.start_Date,end_Date:project1.end_Date,priority:project1.priority,
            user_ID:project1.user_ID,date_start:false})
            this.dialogValue=project1.user_ID;
        this.selectedProecjId=project1.project_ID;
    }
    reset(): void {
        this.isUserUpdating = true;
        this.pageTitle = 'Add Project';
        this.form.reset();
        this.form.setValue({ start_Date: this.currentDate(), end_Date: this.currentDate(), priority: 0 });
    }

suspendProject(project_ID){

    this.projectService.suspendProject(project_ID) .subscribe(response => {
      
             
      },
          error => this.errorMessage = <any>error);
          this.refreshData();
}
    refreshData() {
        this.projectService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.filteredProjects = projects;

            },
            error => this.errorMessage = <any>error);
    }


    openUserModal() {
        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.width = "800px";
        matDialogConfig.height = "480px";
        let dialogRef = this.dialog.open(UserDialogComponent, matDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            //   console.log(`Dialog closed: ${result}`);

            this.dialogResult = result;
            this.dialogValue = result.user_ID;


        })
    }

    sort(property){        
        this.filteredProjects.sort(function(a, b){
            if(a[property] < b[property]){
                return -1 ;
            }
            else if( a[property] > b[property]){
                return 1 ;
            }
            else{
                return 0;
            }
        });
    };

}


