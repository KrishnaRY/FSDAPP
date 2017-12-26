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
    projects: IProject[] = [];
    constructor(
        private router: Router,
        private projectService: ProjectService) { }

        ngOnInit(): void {
            this.projectService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
               
            },
                error => this.errorMessage = <any>error);
        }
}


