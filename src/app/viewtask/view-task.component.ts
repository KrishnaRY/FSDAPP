import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewTaskService } from './view-task.service';
import { IViewTask } from './view-task';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { NgForm } from '@angular/forms';

@Component({
  
    moduleId: module.id,
    templateUrl: 'view-task.component.html'
})

export class ViewTaskComponent implements OnInit{
    pageTitle:string='View Task';
    model: any = {};
    loading = false;
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.viewTasks;
    }
    filteredTasks: IViewTask[];
    viewTasks: IViewTask[] = [];
    constructor(
        private router: Router,
        private viewTaskService: ViewTaskService) { }

        ngOnInit(): void {
            this.viewTaskService.getViewTasks()
            .subscribe(viewTasks => {
                this.viewTasks = viewTasks;
                this.filteredTasks=viewTasks;
               
            },
                error => this.errorMessage = <any>error);
        }

        performFilter(filterBy: string): IViewTask[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.viewTasks.filter((_viewTask: IViewTask) =>
            _viewTask.task.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
}


