type LegacyOrder = {
  id: string | number;
  total: string | number;
  buyer?: string;
};

type Order = {
  id: number;
  total: number;
  buyer: string;
};

function normalizeOrder(input: LegacyOrder): Order {
  return {
    id: Number(input.id),
    total: Number(input.total),
    buyer: input.buyer ?? 'Guest'
  };
}

const legacyOrder: LegacyOrder = {
  id: '1001',
  total: '399.50',
  buyer: undefined
};

console.log(normalizeOrder(legacyOrder));
