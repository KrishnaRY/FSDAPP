import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { UserComponent } from './user/index';
import { UserService } from './user/user.service';
import { ProjectService } from './project/project.service';
import { ProjectComponent } from './project/index';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [UserService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
