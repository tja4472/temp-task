export interface TaskListListItem {
  readonly id: string;
  readonly name: string;
}

export function newTaskListListItem(): TaskListListItem {
  return {
    id: '',
    name: '',
  };
}
