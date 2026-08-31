type PaymentState =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'failed'; reason: string };

function assertNever(value: never): never {
  throw new Error('Unexpected payment state');
}

function describePayment(state: PaymentState): string {
  switch (state.status) {
    case 'pending':
      return 'Pending';
    case 'paid':
      return `Paid:${state.receiptId}`;
    case 'failed':
      return `Failed:${state.reason}`;
    default:
      return assertNever(state);
  }
}

console.log(describePayment({ status: 'pending' }));
console.log(describePayment({ status: 'paid', receiptId: 'R-1001' }));
console.log(describePayment({ status: 'failed', reason: 'timeout' }));
