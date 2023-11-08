import { AfterViewInit, Component } from '@angular/core';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskStatusEnum } from 'src/app/domain/TaskStatusEnum';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements AfterViewInit {

  statusList: TaskStatusEnum[] = [TaskStatusEnum.TODO, TaskStatusEnum.DOING, TaskStatusEnum.DONE];
  // taskMap?: Map<TaskStatusEnum, TaskModel[]>;
  serviceReady: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    // this.taskService.getTasksGroupByStatus();
  }

  ngAfterViewInit(): void {
    console.debug('TaskBoardComponent -> ngAfterViewInit');
    this.taskService.getTasksGroupByStatus()
      .subscribe((tasksGrouped: Map<TaskStatusEnum, TaskModel[]> | null) => {
        console.debug('TaskBoardComponent -> ngAfterViewInit: tasksGrouped: ', tasksGrouped);
        // this.taskMap = tasksGrouped;
        this.serviceReady = true;
      });
  }
}
