import { Task } from './../models/task.model';
import { TaskService } from './../task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  task: Task = { title: '' };
  dialogTitle = ' New Task';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) { }

  ngOnInit() {
    if (this.data) {
      this.dialogTitle = 'Update Task';
      this.task = this.data.task;
    }
  }

  onSave() {
    const operation: Promise<void> =
      (!this.data)
        ? this.taskService.create(this.task)
        : this.taskService.update(this.task);

    operation
      .then(() => this.dialogRef.close())
      .catch(() => this.dialogRef.close());
  }

}
