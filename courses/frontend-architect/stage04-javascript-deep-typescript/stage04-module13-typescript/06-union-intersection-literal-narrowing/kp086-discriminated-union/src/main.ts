type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'failed'; error: string };

function renderState(state: RequestState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Loaded ${state.data.length} items`;
    case 'failed':
      return `Error: ${state.error}`;
  }
}

console.log(renderState({ status: 'loading' }));
console.log(renderState({ status: 'success', data: ['Keyboard', 'Mouse'] }));
console.log(renderState({ status: 'failed', error: 'timeout' }));
