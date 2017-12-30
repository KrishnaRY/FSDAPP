import { Component,OnInit,OnChanges,ViewEncapsulation ,CUSTOM_ELEMENTS_SCHEMA, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from './user-list.service';
import { IUserList } from './user-list';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector:'userlist',
    moduleId: module.id,
    templateUrl: 'user-list.component.html',
    styleUrls: ['./user-list.component.css']
      
})

export class UserDialogComponent implements OnInit{
  
    constructor(public userListService: UserListService,
        public thisDialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IUserList) {

     }
     pageTitle:string='Users';
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
    }
    filteredUsers: IUserList[];
    users: IUserList[] = [];

   
        ngOnInit(): void {
         this.refreshData();
       
           
        } 
        performFilter(filterBy: string): IUserList[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.users.filter((user: IUserList) =>
                  user.first_Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    
 refreshData(){
       this.userListService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.filteredUsers=users;
  
            },
                error => this.errorMessage = <any>error);
    }
    onCloseConfirm(user1:IUserList) {
     
        this.thisDialogRef.close(user1.user_ID);
      }
    
      onCloseCancel() {
        this.thisDialogRef.close('Cancel');
      }

}


