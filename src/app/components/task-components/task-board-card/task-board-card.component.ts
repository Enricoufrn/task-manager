import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskStatusEnum } from 'src/app/domain/TaskStatusEnum';
import { TaskService } from 'src/app/services/task.service';
import { getTaskStatus, getTaskStatusName } from 'src/app/utils/task-utils';

@Component({
  selector: 'app-task-board-card',
  templateUrl: './task-board-card.component.html',
  styleUrls: ['./task-board-card.component.css']
})
export class TaskBoardCardComponent {

  @Input() status?: TaskStatusEnum;
  @Input() tasks?: TaskModel[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    console.debug('TaskBoardCardComponent -> ngOnInit: status: ', this.status);
    if (this.taskService.taskMap != null && this.status != null) {
      this.taskService.taskMap.pipe(
        map((map: Map<TaskStatusEnum, TaskModel[]>) => {
          console.debug('TaskBoardCardComponent -> task map changed: map: ', map);
          this.tasks = map.get(this.status as TaskStatusEnum) || [];
        })
      )
      this.tasks = this.taskService.lastTaskMap?.get(this.status as TaskStatusEnum) || [];
    }
  }

  drop(event: any): void {
    console.debug(event);
    var previousList = event.previousContainer.data as TaskStatusEnum;
    console.debug('previousList: ', previousList);
    var currentList = event.container.data as TaskStatusEnum;
    console.debug('currentList: ', currentList);
    if (currentList != previousList && currentList != null && this.taskService.taskMap != null) {
      const taskId = event.item.data as string;
      const newStatus = getTaskStatusName(currentList);
      console.debug('taskId: ', taskId);
      console.debug('newStatus: ', newStatus);
      // todo: change task status
    }
  }
}
