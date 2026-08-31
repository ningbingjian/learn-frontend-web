const request = {
  method: 'GET',
  path: '/products'
} as const;

function send(method: 'GET' | 'POST', path: string): string {
  return `${method} ${path}`;
}

console.log(send(request.method, request.path));
console.log(Object.isFrozen(request));
