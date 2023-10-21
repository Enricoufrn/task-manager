import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  task: TaskModel | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private taskService: TaskService) { }

  ngOnInit(): void {
    console.debug('TaskDetailsComponent -> ngOnInit()');
    const taskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((task: TaskModel | null) => {
        this.task = task;
      });
    }
  }

  archiveTask(): void {
    const taskId = this.task?.id;
    if (taskId != null && taskId != undefined) {
      this.taskService.changeTaskStatus(taskId, "ARCHIVED").subscribe((task: TaskModel | null) => {
        alert('Tarefa arquivada com sucesso!');
        this.task = task;
      });
    }
  }
}
