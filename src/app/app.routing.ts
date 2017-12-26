import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/index';
import { ProjectComponent } from './project/index';

const appRoutes: Routes = [

    { path: 'user', component: UserComponent },
     { path: 'project', component: ProjectComponent },
      { path: 'task', component: UserComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);