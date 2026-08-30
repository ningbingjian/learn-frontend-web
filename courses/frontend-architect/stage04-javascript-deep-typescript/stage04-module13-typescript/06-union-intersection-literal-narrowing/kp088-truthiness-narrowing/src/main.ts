function displayTitle(title: string | null | undefined): string {
  if (!title) {
    return '(empty or missing)';
  }

  return title.trim().toUpperCase();
}

console.log(displayTitle('Keyboard'));
console.log(displayTitle(''));
console.log(displayTitle(null));
