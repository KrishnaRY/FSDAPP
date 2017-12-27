import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from './task.service';
import { ITask } from './task';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { NgForm } from '@angular/forms';

@Component({
  
    moduleId: module.id,
    templateUrl: 'task.component.html'
})

export class TaskComponent implements OnInit{
    pageTitle:string='Add Task';
    model: any = {};
    loading = false;
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.tasks;
    }
    filteredTasks: ITask[];
    tasks: ITask[] = [];
    constructor(
        private router: Router,
        private taskService: TaskService) { }

        ngOnInit(): void {
            this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
                this.filteredTasks=tasks;
               
            },
                error => this.errorMessage = <any>error);
        }

        performFilter(filterBy: string): ITask[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.tasks.filter((_task: ITask) =>
            _task.task.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
}


