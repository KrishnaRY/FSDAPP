import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from './user';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { NgForm } from '@angular/forms';
@Component({
  
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    model: any = {};
    loading = false;
    errorMessage: string;
    adduser: boolean = true;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
    }
    filteredUsers: IUser[];
    users: IUser[] = [];
    constructor(
        private router: Router,
        private userService: UserService) { }

        addUser(user) {
           
            if(user.user_ID){
           
          this.userService.updateUser(user) .subscribe(response => {
            this.model=[];  
            this.adduser = true;     
            },
                error => this.errorMessage = <any>error);

            }else{
              

           this.userService.addUser(user) .subscribe(response => {
           
                   
            },
                error => this.errorMessage = <any>error);    
        }

        }
     reset(userform: NgForm):void {
    userform.resetForm();
    
  }
         edit(user) {
            this.model=user;
            this.adduser = false;
          /*  this.userService.updateUser(user) .subscribe(response => {
           
                   
            },
                error => this.errorMessage = <any>error);*/
           
        }

        delete(user_ID){
       
          this.userService.deleteUser(user_ID) .subscribe(response => {
              this.router.navigate(['/user']); 
                   
            },
                error => this.errorMessage = <any>error);
         
        }
        ngOnInit(): void {
            this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.filteredUsers=users;
            },
                error => this.errorMessage = <any>error);
        }   
        
        performFilter(filterBy: string): IUser[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.users.filter((user: IUser) =>
                  user.first_Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    


}


