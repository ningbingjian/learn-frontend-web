function resolveTimeout(useCustomTimeout: boolean): number | undefined {
  if (useCustomTimeout) {
    return 3000;
  }

  return undefined;
}

const timeout = resolveTimeout(false);

if (timeout === undefined) {
  console.log('timeout=default');
} else {
  console.log(`timeout=${timeout}`);
}

console.log(typeof timeout);
