import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/domain/TaskModel';
import { TaskStatusEnum } from 'src/app/domain/TaskStatusEnum';
import { TaskService } from 'src/app/services/task.service';
import { formatDateTime, getDateFromString, getTaskStatus } from 'src/app/utils/task-utils';

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

  isUpdate = false;
  submitBtnText: string = '';

  statusList = [
    { value: "TODO", description: TaskStatusEnum.TODO },
    { value: "DOING", description: TaskStatusEnum.DOING },
    { value: "DONE", description: TaskStatusEnum.DONE },
    { value: "ARCHIVED", description: TaskStatusEnum.ARCHIVED },
  ];

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
        this.isUpdate = true;
        console.debug('TaskFormComponent -> ngOnInit: btnText: ', this.submitBtnText);
      });
    }
    this.submitBtnText = this.isUpdate ? 'Salvar alterações' : 'Cadastrar';
  }

  onSubmit() {
    console.debug('TaskFormComponent -> onSubmit called');
    if (this.taskForm.valid) {
      const createdAtValue = this.taskForm.get('createdAt')?.value;
      const updatedAtValue = this.taskForm.get('updatedAt')?.value;

      const isUpdate = this.taskForm.get('id')?.value ? true : false;
      const status = getTaskStatus(this.taskForm.get('status')?.value);

      const newTask = new TaskModel(this.taskForm.get('id')?.value,
        this.taskForm.get('title')?.value,
        this.taskForm.get('description')?.value,
        status,
        null,
        getDateFromString(createdAtValue),
        getDateFromString(updatedAtValue));

      this.taskService.save(newTask, isUpdate)
        .subscribe((task: TaskModel | null) => {
          const message = isUpdate ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!';
          alert(message);
        });
    }
  }

  formatDate(date: string | null | undefined): string {
    return formatDateTime(date);
  }
}
