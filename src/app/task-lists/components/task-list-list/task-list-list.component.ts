import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { TaskListListItem } from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-task-list-list',
  templateUrl: './task-list-list.component.html',
  styleUrls: ['./task-list-list.component.css'],
})
export class TaskListListComponent implements OnInit {
  @Input()
  currentTasks: TaskListListItem[];

  @Output() newCurrentTask = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  editPath() {
    return (
      pathPrefix +
      routeNames.taskLists.path +
      pathPrefix +
      routeNames.taskLists.edit.path
    );
  }
}
