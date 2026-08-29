type PublishStatus = 'draft' | 'published';

function assertNever(value: never): never {
  throw new Error(`Unhandled status: ${String(value)}`);
}

function statusLabel(status: PublishStatus): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'published':
      return 'Published';
    default:
      return assertNever(status);
  }
}

console.log(statusLabel('draft'));
console.log(statusLabel('published'));
