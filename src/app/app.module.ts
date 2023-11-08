import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TaskListComponent } from './components/task-components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-components/task-details/task-details.component';
import { httpInterceptorProviders } from './config/injection-config';
import { TasksManagerComponent } from './components/task-components/tasks-manager/tasks-manager.component';
import { AuthGuard } from './config/auth-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { TaskBoardComponent } from './components/task-components/task-board/task-board.component';
import { TaskBoardCardComponent } from './components/task-components/task-board-card/task-board-card.component';
import { TaskBoardCardItemComponent } from './components/task-components/task-board-card-item/task-board-card-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    HomeComponent,
    UserDetailsComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TasksManagerComponent,
    TaskBoardComponent,
    TaskBoardCardComponent,
    TaskBoardCardItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    NgbModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
