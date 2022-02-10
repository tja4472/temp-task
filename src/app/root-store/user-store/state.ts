import { User } from '@app/models';

export interface State {
  user: User | null;
  taskListId: string | null;
}

export const initialState: State = {
  user: null,
  taskListId: null,
};
