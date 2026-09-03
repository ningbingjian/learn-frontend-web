import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const rootCandidate = document.querySelector('#root');
const evidenceCandidate = document.querySelector('#commit-evidence');

if (!(rootCandidate instanceof HTMLElement)) {
  throw new Error('无法启动 Render Model Inspector：缺少 #root。');
}

if (!(evidenceCandidate instanceof HTMLOListElement)) {
  throw new Error('无法启动 Render Model Inspector：缺少 #commit-evidence。');
}

const rootNode: HTMLElement = rootCandidate;
const evidenceList: HTMLOListElement = evidenceCandidate;
let evidenceSequence = 0;

function describeMutation(record: MutationRecord) {
  if (record.type === 'characterData') {
    return `characterData → ${record.target.textContent ?? '(empty)'}`;
  }

  if (record.type === 'attributes') {
    const targetName =
      record.target instanceof Element
        ? record.target.tagName.toLowerCase()
        : 'unknown';

    return `attributes → ${targetName}[${record.attributeName ?? 'unknown'}]`;
  }

  return `childList → +${record.addedNodes.length} / -${record.removedNodes.length}`;
}

function appendCommitEvidence(message: string) {
  evidenceSequence += 1;
  const item = document.createElement('li');
  item.textContent = `#${evidenceSequence} ${message}`;
  evidenceList.prepend(item);

  while (evidenceList.childElementCount > 30) {
    evidenceList.lastElementChild?.remove();
  }
}

function clearCommitEvidence() {
  evidenceSequence = 0;
  evidenceList.replaceChildren();
}

const observer = new MutationObserver((records) => {
  for (const record of records) {
    appendCommitEvidence(`[Commit evidence] ${describeMutation(record)}`);
  }
});

observer.observe(rootNode, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
});

createRoot(rootNode).render(
  <StrictMode>
    <App onResetCommitEvidence={clearCommitEvidence} />
  </StrictMode>,
);
