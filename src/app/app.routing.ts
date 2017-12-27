import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/index';
import { ProjectComponent } from './project/index';
import { TaskComponent } from './task/index';
import { ViewTaskComponent } from './viewtask/index';

const appRoutes: Routes = [
    { path: 'user', component: UserComponent },
     { path: 'project', component: ProjectComponent },
      { path: 'task', component: TaskComponent },
       { path: 'viewtask', component: ViewTaskComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);