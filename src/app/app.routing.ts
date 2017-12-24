import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/index';

const appRoutes: Routes = [

    { path: 'user', component: UserComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);