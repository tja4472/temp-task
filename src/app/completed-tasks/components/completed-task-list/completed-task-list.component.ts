import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { CompletedTask } from '@app/root-store/tasks-store/models';

import { format } from 'date-fns';

interface GroupTasksByDate {
  header: string;
  tasks: CompletedTask[];
}

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrls: ['./completed-task-list.component.css'],
})
export class CompletedTaskListComponent implements OnInit {
  private inputCurrentTasks: CompletedTask[];

  @Input()
  set currentTasks(tasks: CompletedTask[]) {
    this.inputCurrentTasks = tasks;

    this.viewGroupByDateArray = this.convertToGroupByDateArray(tasks);
  }

  get currentTasks(): CompletedTask[] {
    return this.inputCurrentTasks;
  }

  @Output() toggleCompleteItem = new EventEmitter<CompletedTask>();

  viewGroupByDateArray: GroupTasksByDate[] = [];

  constructor() {}

  private convertToGroupByDateArray(
    tasks: CompletedTask[]
  ): GroupTasksByDate[] {
    // sort by descending completedTimestamp
    const sorted = tasks.sort((a, b) => {
      if (a.completedTimestamp > b.completedTimestamp) {
        return -1;
      }

      if (a.completedTimestamp < b.completedTimestamp) {
        return 1;
      }

      return 0;
    });

    const result: GroupTasksByDate[] = [];

    let header = '';
    let groupTasks: CompletedTask[] = [];

    sorted.forEach((value) => {
      const dateText = format(value.completedTimestamp, 'E, d MMM yyyy');
      // const dateText = moment(value.updatedTimestamp).format('ddd, D MMM YYYY');

      if (dateText === header) {
        groupTasks.push(value);
      } else {
        header = dateText;
        groupTasks = [{ ...value }];
        result.push({ header, tasks: groupTasks });
      }
    });

    return result;
  }

  ngOnInit() {}

  viewTrackBy(index: number, item: CompletedTask) {
    return item.id;
  }

  editPath() {
    return (
      pathPrefix +
      routeNames.completedTasks.path +
      pathPrefix +
      routeNames.completedTasks.edit.path
    );
  }
}
