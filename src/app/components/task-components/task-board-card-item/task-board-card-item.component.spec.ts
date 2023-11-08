import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardCardItemComponent } from './task-board-card-item.component';

describe('TaskBoardCardItemComponent', () => {
  let component: TaskBoardCardItemComponent;
  let fixture: ComponentFixture<TaskBoardCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskBoardCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBoardCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
