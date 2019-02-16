import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;

  selectedTask: Task;
  loading = true;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks.valueChanges();
    this.tasks$
      .pipe(take(1))
      .subscribe(() => this.loading = false);
  }

  onPerformTask(task: Task): void {
    task.done = !task.done;
    this.taskService.update(task);
  }

  showDialog(task?: Task) {
    const config: MatDialogConfig<any> = (task) ? {data: { task }} : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  onDelete(task: Task) {
    this.taskService.delete(task);
  }
}
