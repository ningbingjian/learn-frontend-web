function acceptDraft(status: 'draft'): string {
  return `accepted:${status}`;
}

const initialStatus = 'draft';
let mutableStatus = initialStatus;

const fixedStatus: 'draft' = 'draft';
let copiedFixedStatus = fixedStatus;

mutableStatus = 'published';

console.log(acceptDraft(initialStatus));
console.log(acceptDraft(copiedFixedStatus));
console.log(mutableStatus);
