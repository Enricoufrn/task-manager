import { EventEmitter, Injectable } from '@angular/core';
import { ApiRoutesService } from './api-routes.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TaskModel } from '../domain/TaskModel';
import { Observable, map, of } from 'rxjs';
import { ChangeTaskStatusRequest } from '../domain/ChangeTaskStatusRequest';
import { formatDate } from '@angular/common';
import { getTaskStatus, getTaskStatusName } from '../utils/task-utils';
import { TaskStatusEnum } from '../domain/TaskStatusEnum';
import { TasksGroupedDTO } from '../domain/TasksGroupedDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskMap: EventEmitter<Map<TaskStatusEnum, TaskModel[]>> = new EventEmitter();
  lastTaskMap?: Map<TaskStatusEnum, TaskModel[]>;

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
      task.createdAt = task.createdAt ? formatDate(task.createdAt, 'yyyy-MM-dd HH:mm:ss', 'pt-BR') : null;
      task.updatedAt = task.updatedAt ? formatDate(task.updatedAt, 'yyyy-MM-dd HH:mm:ss', 'pt-BR') : null;
      task.status = getTaskStatusName(task.status);
      if (isUpdate) {
        return this.httpClient.put<TaskModel>(newTaskUrl, task, { observe: 'response' })
          .pipe(
            map((response: HttpResponse<TaskModel>) => {
              if (response.status === 200) {
                const task = response.body || null;
                console.debug('TaskService -> updated task: ', task);
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
                console.debug('TaskService -> newTask: ', task);
                return task;
              } else {
                return null;
              }
            }));
      }
    } else return of(null);
  }

  changeTaskStatus(taskId: string, newStatus: string): Observable<TaskModel | null> {
    const request = new ChangeTaskStatusRequest(taskId, newStatus);
    const config = this.apiRoutesService.getConfig();
    if (config != null) {
      const newTaskUrl = `${config?.protocol}://${config?.host}${config?.baseUrl}${config?.tasksRoute}/${config?.updateTaskStatusRoute}`;
      return this.httpClient.post<TaskModel>(newTaskUrl, request, { observe: 'response' })
        .pipe(
          map((response: HttpResponse<TaskModel>) => {
            if (response.status === 200) {
              const task = response.body || null;
              console.debug('TaskService -> changeTaskStatus: ', task);
              this.getTasksGroupByStatus().subscribe((tasksMap: Map<TaskStatusEnum, TaskModel[]> | null) => { });
              return task;
            } else {
              return null;
            }
          }));
    } else return of(null);
  }

  getTasksGroupByStatus(): Observable<Map<TaskStatusEnum, TaskModel[]> | null> {
    const config = this.apiRoutesService.getConfig();
    if (config != null) {
      const tasksGroupedUrl = `${config.protocol}://${config.host}${config.baseUrl}${config.tasksRoute}/${config.getTasksGroupedByStatusRoute}`;
      return this.httpClient.get<TasksGroupedDTO[]>(tasksGroupedUrl, { observe: 'response' })
        .pipe(
          map((response: HttpResponse<TasksGroupedDTO[]>) => {
            if (response.status == 200) {
              const tasksGrouped = response.body || [];
              console.debug('TaskService -> getTasksGroupByStatus: tasksGrouped: ', tasksGrouped);
              const tasksMap = new Map<TaskStatusEnum, TaskModel[]>();
              tasksGrouped.forEach((tasksGrouped: TasksGroupedDTO) => {
                if (tasksGrouped.status && tasksGrouped.tasks) {
                  const status = getTaskStatus(tasksGrouped.status);
                  if (status != null) {
                    tasksMap.set(status, tasksGrouped.tasks);
                  }
                }
              });
              this.lastTaskMap = tasksMap;
              this.taskMap?.emit(tasksMap);
              return tasksMap;
            } else {
              return null;
            }
          })
        )
    }
    return of(null);
  }
}
