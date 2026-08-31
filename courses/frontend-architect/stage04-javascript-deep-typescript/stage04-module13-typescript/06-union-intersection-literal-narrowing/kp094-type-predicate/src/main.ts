type DownloadableProduct = {
  name: string;
  downloadUrl: string;
};

type ShippableProduct = {
  name: string;
  weight: number;
};

type Product = DownloadableProduct | ShippableProduct;

function isDownloadable(product: Product): product is DownloadableProduct {
  return 'downloadUrl' in product;
}

const products: Product[] = [
  { name: 'TypeScript Guide', downloadUrl: '/downloads/ts-guide.pdf' },
  { name: 'Keyboard', weight: 0.8 }
];

const downloads = products.filter(isDownloadable);

console.log(downloads[0].name);
console.log(downloads[0].downloadUrl);
