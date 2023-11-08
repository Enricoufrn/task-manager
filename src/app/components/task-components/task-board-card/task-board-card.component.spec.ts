import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardCardComponent } from './task-board-card.component';

describe('TaskBoardCardComponent', () => {
  let component: TaskBoardCardComponent;
  let fixture: ComponentFixture<TaskBoardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskBoardCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBoardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
