import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/domain/TaskModel';

@Component({
  selector: 'app-task-board-card-item',
  templateUrl: './task-board-card-item.component.html',
  styleUrls: ['./task-board-card-item.component.css']
})
export class TaskBoardCardItemComponent {

  @Input() task?: TaskModel;

  constructor() { }

  ngOnInit() { }
}
