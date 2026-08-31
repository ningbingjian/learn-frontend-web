type CheckoutState =
  | { status: 'idle' }
  | { status: 'submitting'; orderId: string; attempt: number }
  | { status: 'success'; orderId: string; receiptId: string }
  | { status: 'failed'; orderId: string; error: string; attempt: number };

type CheckoutEvent =
  | { type: 'SUBMIT'; orderId: string }
  | { type: 'RESOLVE'; receiptId: string }
  | { type: 'REJECT'; error: string }
  | { type: 'RETRY' }
  | { type: 'RESET' };

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function transition(state: CheckoutState, event: CheckoutEvent): CheckoutState {
  switch (event.type) {
    case 'SUBMIT':
      if (state.status !== 'idle') {
        return state;
      }
      return {
        status: 'submitting',
        orderId: event.orderId,
        attempt: 1
      };

    case 'RESOLVE':
      if (state.status !== 'submitting') {
        return state;
      }
      return {
        status: 'success',
        orderId: state.orderId,
        receiptId: event.receiptId
      };

    case 'REJECT':
      if (state.status !== 'submitting') {
        return state;
      }
      return {
        status: 'failed',
        orderId: state.orderId,
        error: event.error,
        attempt: state.attempt
      };

    case 'RETRY':
      if (state.status !== 'failed') {
        return state;
      }
      return {
        status: 'submitting',
        orderId: state.orderId,
        attempt: state.attempt + 1
      };

    case 'RESET':
      return { status: 'idle' };

    default:
      return assertNever(event);
  }
}

function describeState(state: CheckoutState): string {
  switch (state.status) {
    case 'idle':
      return 'Idle';
    case 'submitting':
      return `Submitting:${state.orderId}:attempt=${state.attempt}`;
    case 'success':
      return `Success:${state.orderId}:${state.receiptId}`;
    case 'failed':
      return `Failed:${state.orderId}:attempt=${state.attempt}:${state.error}`;
    default:
      return assertNever(state);
  }
}

let state: CheckoutState = { status: 'idle' };
console.log(describeState(state));

state = transition(state, { type: 'SUBMIT', orderId: 'O-1001' });
console.log(describeState(state));

state = transition(state, { type: 'REJECT', error: 'payment timeout' });
console.log(describeState(state));

state = transition(state, { type: 'RETRY' });
console.log(describeState(state));

state = transition(state, { type: 'RESOLVE', receiptId: 'R-9001' });
console.log(describeState(state));

state = transition(state, { type: 'RESET' });
console.log(describeState(state));
