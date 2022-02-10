export interface CompletedTask {
  readonly id: string;
  readonly description: string | null;
  readonly isComplete: boolean;
  readonly completedTimestamp: number;
  readonly name: string;
  readonly updatedTimestamp: number;
}

export function newCompletedTask(): CompletedTask {
  return {
    description: null,
    id: '',
    isComplete: true,
    completedTimestamp: Date.now(),
    name: '',
    updatedTimestamp: Date.now(),
  };
}
