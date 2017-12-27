import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { UserComponent } from './user/index';
import { UserService } from './user/user.service';
import { ProjectService } from './project/project.service';
import { ProjectComponent } from './project/index';
import { TaskComponent } from './task/index';
import { TaskService } from './task/task.service';
import { ViewTaskComponent } from './viewtask/index';
import { ViewTaskService } from './viewtask/view-task.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [UserService,ProjectService,TaskService,ViewTaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
