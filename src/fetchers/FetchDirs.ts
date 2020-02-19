import { Map as MapIm } from 'immutable';

import { emulateLatency } from '../assembly/latency';
import { shell } from '../assembly/utility';
import { CalcState, Dir } from '../containers/Dirs';

export const mockedState: Map<string, Dir> = new Map();

function getDir(name: string): Dir {
  if (mockedState.has(name)) return mockedState.get(name) as Dir;

  // console.log(`generate new ${name}`);

  const dir: Dir = {
    name,
    calcs: [
      { name: "HIGH", state: CalcState.Missing },
      { name: "LOW", state: CalcState.Missing },
      { name: "PSD", state: CalcState.Missing }
    ]
  };
  mockedState.set(name, dir);

  return dir;
}

export async function fetchDirs(): Promise<MapIm<string, Dir>> {
  await emulateLatency();

  return shell(20)
    .map((_, i) => getDir(`dir${i}`))
    .reduce((acc, dir) => acc.set(dir.name, dir), MapIm<string, Dir>());
}

export async function fetchDir(dirName: string): Promise<Dir> {
  await emulateLatency();

  return getDir(dirName);
}
