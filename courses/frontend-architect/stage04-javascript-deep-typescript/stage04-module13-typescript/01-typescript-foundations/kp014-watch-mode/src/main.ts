type Task = {
  id: number;
  title: string;
  done: boolean;
};

function summarize(task: Task): string {
  return `${task.id}. ${task.title} [${task.done ? 'done' : 'todo'}]`;
}

const task: Task = {
  id: 1,
  title: 'learn watch mode',
  done: false
};

console.log(summarize(task));
