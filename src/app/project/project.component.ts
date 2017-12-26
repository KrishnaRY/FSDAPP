import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './project.service';
import { IProject } from './project';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { NgForm } from '@angular/forms';

@Component({
  
    moduleId: module.id,
    templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit{
    model: any = {};
    loading = false;
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
    constructor(
        private router: Router,
        private projectService: ProjectService) { }

        ngOnInit(): void {
            this.projectService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.filteredProjects=projects;
               
            },
                error => this.errorMessage = <any>error);
        }

        performFilter(filterBy: string): IProject[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.projects.filter((_project: IProject) =>
            _project.project.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
}


