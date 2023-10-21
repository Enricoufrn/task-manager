import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskService } from 'src/app/services/task.service';
import { getTaskStatus } from 'src/app/utils/task-utils';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks: TaskModel[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks: TaskModel[] | null) => {
      if (tasks) {
        this.tasks = tasks;
      }
    });
  }

  editTask(taskId: string | null | undefined) {
    console.debug('TaskListComponent -> editTask: task: ', taskId);
    if (taskId) {
      this.router.navigate(['../form', taskId], { relativeTo: this.route });
    }
  }

  deleteTask(task: TaskModel) {
    console.debug('TaskListComponent -> deleteTask: task: ', task);
  }

  viewTask(taskId: string | null | undefined) {
    console.debug('TaskListComponent -> viewTask: taskId: ', taskId);
    if (taskId) {
      this.router.navigate(['../view', taskId], { relativeTo: this.route });
    }
  }

  status(status: string | null | undefined): string {
    return getTaskStatus(status);
  }
}
