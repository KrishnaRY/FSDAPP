import { Component,OnInit,OnChanges,ViewEncapsulation ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from './user';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';


@Component({
  
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css'],
    encapsulation:ViewEncapsulation.None,
    
})

export class UserComponent implements OnInit{
    pageTitle:string='Add User';
    loading = false;
    errorMessage: string;
    public isUserUpdating: boolean = true;
    public form:FormGroup;
    selectedUserId:number=0;
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
        private userService: UserService,
         formBuilder:FormBuilder) { 
             this.form=new FormGroup({
                first_Name:new FormControl(null,Validators.required),
                last_Name:new FormControl(null,Validators.required),
                employee_ID:new FormControl(null,Validators.required),

             })
         }

        addUser() {
            let id =  this.selectedUserId>0?this.selectedUserId:undefined;
            let user1:IUser = {
                user_ID: id,                
                first_Name: this.form.value.first_Name,
                last_Name: this.form.value.last_Name,
                employee_ID: this.form.value.employee_ID
                
            };
            if(!!id) {
                this.userService.updateUser(user1) .subscribe(response => {
                    this.isUserUpdating = true;  
                    this.pageTitle='Add User' ; 
                    this.refreshData();  
                    },
                        error => this.errorMessage = <any>error);
            } else {
                this.userService.addUser(user1) .subscribe(response => {
           
                   
                },
                    error => this.errorMessage = <any>error);    
                    this.refreshData();           
            }
    
          

        }
     reset():void {
        this.isUserUpdating = true;
        this.pageTitle='Add User' ;  
    this.form.reset();
    
     
     
  }
         edit(user) {         
            this.isUserUpdating = false;
            this.pageTitle='Edit User' ;
            this.form.setValue({first_Name:user.first_Name,last_Name:user.last_Name,employee_ID:user.employee_ID})
            this.selectedUserId=user.user_ID;
        }

        delete(user_ID){
       
          this.userService.deleteUser(user_ID) .subscribe(response => {
              this.router.navigate(['/user']); 
                   
            },
                error => this.errorMessage = <any>error);
                this.refreshData();
        }
        ngOnInit(): void {
         this.refreshData();
       
           
        } 
        
        sort(property){        
            this.filteredUsers.sort(function(a, b){
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
   
        performFilter(filterBy: string): IUser[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.users.filter((user: IUser) =>
                  user.first_Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    
 refreshData(){
       this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.filteredUsers=users;
                this.selectedUserId =0;
                this.form.reset();
            },
                error => this.errorMessage = <any>error);
    }


}


