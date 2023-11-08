import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskStatusEnum } from 'src/app/domain/TaskStatusEnum';

@Component({
  selector: 'app-task-board-card',
  templateUrl: './task-board-card.component.html',
  styleUrls: ['./task-board-card.component.css']
})
export class TaskBoardCardComponent {

  @Input() status?: TaskStatusEnum;
  @Input() tasks?: TaskModel[];

  constructor() { }

  ngOnInit() {
  }
}
