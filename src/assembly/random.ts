export function randomInt(min: number | Date, max: number | Date): number {
  // min and max are included
  return Math.floor(
    Math.random() * (max.valueOf() - min.valueOf() + 1) + min.valueOf()
  );
}

export function pickRandom<T>(array: Array<T>): T {
  const index = randomInt(0, array.length - 1);
  return array[index];
}

export function randomBool(): boolean {
  return Math.random() > 0.5;
}
