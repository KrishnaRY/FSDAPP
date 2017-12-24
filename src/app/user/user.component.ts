import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router) { }

    
}
