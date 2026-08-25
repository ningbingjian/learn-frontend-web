type HasName = {
  name: string;
};

function printName(value: HasName): void {
  console.log(value.name);
}

const customer = {
  id: 1,
  name: 'Ada',
  email: 'ada@example.com'
};

const service = {
  name: 'Billing Service',
  version: 'v2'
};

printName(customer);
printName(service);
