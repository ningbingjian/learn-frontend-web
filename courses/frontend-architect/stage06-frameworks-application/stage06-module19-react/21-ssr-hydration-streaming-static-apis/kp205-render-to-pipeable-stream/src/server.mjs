import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';

function Document() {
  return React.createElement(
    'html',
    { lang: 'zh-CN' },
    React.createElement(
      'body',
      null,
      React.createElement('p', null, 'RE-KP205'),
      React.createElement('h1', null, 'renderToPipeableStream'),
      React.createElement('p', null, 'React 正在把 HTML 写入 Node.js Stream。'),
    ),
  );
}

const output = new PassThrough();
output.setEncoding('utf8');
output.on('data', chunk => {
  console.log('chunk:', JSON.stringify(chunk));
});
output.on('end', () => {
  console.log('stream ended');
});

let didError = false;
const { pipe, abort } = renderToPipeableStream(React.createElement(Document), {
  onShellReady() {
    console.log('shell ready');
    pipe(output);
  },
  onShellError(error) {
    didError = true;
    console.error('shell error:', error);
  },
  onError(error) {
    didError = true;
    console.error('render error:', error);
  },
});

setTimeout(() => abort(), 5000).unref();
process.on('beforeExit', () => {
  if (didError) process.exitCode = 1;
});
