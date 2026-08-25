type HasId = {
  id: number;
};

function printId(value: HasId): void {
  console.log(value.id);
}

const user = {
  id: 1,
  name: 'Ada'
};

const order = {
  id: 1001,
  total: 399,
  status: 'paid'
};

printId(user);
printId(order);

// 取消注释后应出现缺少 id 的类型错误：
// printId({ name: 'Anonymous' });
