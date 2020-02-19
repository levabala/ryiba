import { randomInt } from './random';

export function emulateLatency(min = 0, max = 1000) {
  return new Promise(res => setTimeout(() => res(), randomInt(min, max)));
}
