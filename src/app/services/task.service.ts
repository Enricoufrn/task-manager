import { Injectable } from '@angular/core';
import { ApiRoutesService } from './api-routes.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TaskModel } from '../domain/TaskModel';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private apiRoutesService: ApiRoutesService,
    private httpClient: HttpClient) { }

  getTask(id: string): Observable<TaskModel | null> {
    const config = this.apiRoutesService.getConfig();
    if (config != null) {
      const viewTaskUrl = `${config.protocol}://${config.host}${config.baseUrl}${config.tasksRoute}/${id}`;
      return this.httpClient.get<TaskModel>(viewTaskUrl, { observe: 'response' })
        .pipe(
          map((response: HttpResponse<TaskModel>) => {
            if (response.status == 200) {
              const task = response.body || null;
              console.debug('TaskService -> getTask: task: ', task);
              return task;
            } else {
              return null;
            }
          })
        );
    } else return of(null);
  }

  getTasks(): Observable<TaskModel[] | null> {
    const config = this.apiRoutesService.getConfig();
    if (config != null) {
      const tasksRoute = `${config.protocol}://${config.host}${config.baseUrl}${config.tasksRoute}`;
      return this.httpClient.get<TaskModel[]>(tasksRoute, { observe: 'response' })
        .pipe(
          map((response: HttpResponse<TaskModel[]>) => {
            if (response.status == 200) {
              const tasks = response.body || [];
              console.debug('TaskService -> getTasks: tasks: ', tasks);
              return tasks;
            } else {
              console.debug('TaskListComponent -> getTasks: response: ', response);
              return null;
            }
          }));
    } else return of(null);
  }

  save(task: TaskModel, isUpdate: boolean): Observable<TaskModel | null> {
    const config = this.apiRoutesService.getConfig();
    if (config != null) {
      const newTaskUrl = `${config?.protocol}://${config?.host}${config?.baseUrl}${config?.tasksRoute}`;
      if (isUpdate) {
        return this.httpClient.put<TaskModel>(newTaskUrl, task, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<TaskModel>) => {
              if (response.status === 201) {
                const task = response.body || null;
                console.debug('TaskService -> newTask: task: ', task);
                return task;
              } else {
                return null;
              }
            }));
      } else {
        return this.httpClient.post<TaskModel>(newTaskUrl, task, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<TaskModel>) => {
              if (response.status === 201) {
                const task = response.body || null;
                console.debug('TaskService -> newTask: task: ', task);
                return task;
              } else {
                return null;
              }
            }));
      }
    } else return of(null);
  }
}
