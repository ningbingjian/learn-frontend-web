import { add, formatResult } from './math.js';

const moduleSecret = 'only-in-module';
const value = add(20, 22);

const result = document.querySelector('#result');
result.textContent = [
  formatResult(value),
  '正文节点存在：' + Boolean(result),
  'window.moduleSecret：' + String(window.moduleSecret),
  '模块私有变量：' + moduleSecret
].join('\n');
