const isLoggedIn: boolean = true;
const hasPermission = false;

function canOpenAdmin(loggedIn: boolean, permitted: boolean): boolean {
  return loggedIn && permitted;
}

console.log(`first=${canOpenAdmin(isLoggedIn, hasPermission)}`);
console.log(`second=${canOpenAdmin(isLoggedIn, true)}`);
console.log(typeof isLoggedIn);
