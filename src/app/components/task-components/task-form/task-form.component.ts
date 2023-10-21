import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) { }

  taskForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl('')
  });

  ngOnInit(): void {
    console.debug('TaskFormComponent -> ngOnInit called');
    const taskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((task: TaskModel | null) => {
        const title = task?.title || '';
        const description = task?.description || '';
        const status = task?.status || '';
        const createdAt = task?.createdAt || '';
        const updatedAt = task?.updatedAt || '';
        this.taskForm.get('id')?.setValue(taskId);
        this.taskForm.get('title')?.setValue(title);
        this.taskForm.get('description')?.setValue(description);
        this.taskForm.get('status')?.setValue(status);
        this.taskForm.get('createdAt')?.setValue(createdAt.toString());
        this.taskForm.get('updatedAt')?.setValue(updatedAt.toString());
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const createdAtValue = this.taskForm.get('createdAt')?.value;
      const updatedAtValue = this.taskForm.get('updatedAt')?.value;

      const isUpdate = this.taskForm.get('id')?.value ? true : false;

      const newTask = {
        id: this.taskForm.get('id')?.value,
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        status: this.taskForm.get('status')?.value,
        owner: null,
        createdAt: createdAtValue,
        updatedAt: updatedAtValue
      };
      this.taskService.save(newTask, isUpdate)
        .subscribe((task: TaskModel | null) => {
          const message = isUpdate ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!';
          alert(message);
        });
    }
  }

  formatDateTime(date: string | null | undefined): string {
    if (!date) {
      return '';
    }

    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
