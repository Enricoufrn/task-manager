import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TaskListComponent } from './components/task-components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-components/task-details/task-details.component';
import { TasksManagerComponent } from './components/task-components/tasks-manager/tasks-manager.component';
import { canActivateTeam } from './config/auth-guard';

const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    children: [
      { path: 'my-account', title: 'Minha conta', component: UserDetailsComponent, canActivate: [canActivateTeam] },
      {
        path: 'tasks',
        title: 'Gerenciar tarefas',
        component: TasksManagerComponent,
        canActivate: [canActivateTeam],
        children: [
          { path: 'list', title: 'Lista de tarefas', component: TaskListComponent },
          { path: 'form', title: 'Nova tarefa', component: TaskFormComponent },
          { path: 'form/:id', title: 'Editar tarefa', component: TaskFormComponent },
          { path: 'view/:id', title: 'Tarefa - Detalhes', component: TaskDetailsComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    ]
  },
  { path: 'register-user', title: 'Novo usuário', component: RegisterUserComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
