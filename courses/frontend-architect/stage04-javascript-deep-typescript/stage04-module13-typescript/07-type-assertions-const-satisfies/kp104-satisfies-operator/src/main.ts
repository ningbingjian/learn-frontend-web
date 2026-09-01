type RouteName = 'home' | 'products';

type RouteConfig = {
  path: `/${string}`;
  secure: boolean;
};

const routes = {
  home: { path: '/', secure: false },
  products: { path: '/products', secure: true }
} satisfies Record<RouteName, RouteConfig>;

const homePath: '/' = routes.home.path;

console.log(routes.home.path);
console.log(routes.products.secure);
