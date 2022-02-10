/*
Hard-coded route URLs and paths in templates and component models is a poor practice.

We’re better off storing route paths and URLs in a separate module that we can reference from our components, directives, and services.
*/
export const pathPrefix = '/';

export const routeNames = {
  home: {
    path: 'home',
  },
  completedTasks: {
    path: 'tasks/completed',
    edit: {
      path: 'edit',
      idParam: 'completedTaskId',
    },
  },
  currentTasks: {
    path: 'tasks/current',
    edit: {
      path: 'edit',
      idParam: 'currentTaskId',
    },
    new: {
      path: 'new',
    },
  },
  signIn: {
    path: 'sign-in',
  },
  signInComponentStore: {
    path: 'sign-in-component-store',
  },
  signUp: {
    path: 'sign-up',
  },
  tasks: {
    path: 'tasks',
  },
  taskLists: {
    path: 'tasks/lists',
    edit: {
      path: 'edit',
      idParam: 'taskListid',
    },
    new: {
      path: 'new',
    },
  },
};
