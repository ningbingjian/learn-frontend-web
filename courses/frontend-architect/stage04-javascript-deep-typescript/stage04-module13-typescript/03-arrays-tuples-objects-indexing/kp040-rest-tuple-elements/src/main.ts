type Route = [string, ...number[]];

function describeRoute(route: Route): string {
  const [resource, ...segments] = route;
  const suffix = segments.length === 0 ? 'root' : segments.join('/');
  return `${resource}:${suffix}`;
}

const users: Route = ['users'];
const orderArchive: Route = ['orders', 2026, 8, 28];

console.log(describeRoute(users));
console.log(describeRoute(orderArchive));
