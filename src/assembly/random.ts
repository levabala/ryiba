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

export function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}
