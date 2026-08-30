type PublishStatus = 'draft' | 'published';
type HttpResult = [number, string];

interface Account {
  id: number;
}

interface Account {
  name: string;
}

const publishStatus: PublishStatus = 'published';
const result: HttpResult = [200, 'OK'];
const account: Account = {
  id: 1,
  name: 'Ada'
};

console.log(publishStatus);
console.log(`${result[0]}:${result[1]}`);
console.log(`${account.id}:${account.name}`);
