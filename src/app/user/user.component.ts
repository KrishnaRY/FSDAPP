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
    users: IUser[] = [];
    constructor(
        private router: Router,
        private userService: UserService) { }

        addUser(user) {
           this.userService.addUser(user) .subscribe(response => {
           
                   
            },
                error => this.errorMessage = <any>error);    
          
           
        }
     reset(userform: NgForm):void {
    userform.resetForm();
    
  }
         edit(user) {
          
            this.userService.updateUser(user) .subscribe(response => {
           
                   
            },
                error => this.errorMessage = <any>error);
           
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
               
            },
                error => this.errorMessage = <any>error);
        }
}


