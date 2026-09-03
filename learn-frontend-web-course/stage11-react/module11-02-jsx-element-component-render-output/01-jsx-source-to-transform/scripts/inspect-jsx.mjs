import ts from 'typescript';

const source = `
const title = 'Production Release';

const element = (
  <section className="release-card" data-environment="staging">
    <h2>{title}</h2>
    <p>JSX is syntax, not DOM.</p>
  </section>
);
`;

const result = ts.transpileModule(source, {
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: 'example.tsx',
});

console.log('=== JSX source ===');
console.log(source.trim());
console.log('\n=== TypeScript react-jsx output ===');
console.log(result.outputText.trim());
